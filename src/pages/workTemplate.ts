import { queryElement } from '$utils/queryElement';
import { queryElements } from '$utils/queryElements';

export const workTemplate = () => {
  console.log('workTemplate');

  const attr = 'data-credits';
  const component = queryElement<HTMLDivElement>(`[${attr}="component"]`);
  const items = queryElements<HTMLDivElement>(`[${attr}="item"]`, component);
  const groups = queryElement<HTMLDivElement>(`[${attr}="groups"]`, component);
  const groupTemplate = queryElement<HTMLDivElement>(`[${attr}="group-template"]`, groups);
  if (!component || items.length === 0 || !groups || !groupTemplate) return;

  // get all groups
  const groupNames: string[] = [];
  items.forEach((item) => {
    const creditsGroup = item.dataset.creditsGroup || '';
    if (groupNames.includes(creditsGroup)) return;
    groupNames.push(creditsGroup);
  });

  // loop through each group
  groupNames.forEach((groupName) => {
    // clone the group
    const groupClone = groupTemplate.cloneNode(true) as HTMLDivElement;

    // add the title or delete if not needed
    const groupTitle = queryElement<HTMLDivElement>(`[${attr}="group-title"]`, groupClone);
    if (groupTitle && groupName !== '') {
      groupTitle.textContent = groupName;
    } else {
      groupTitle?.remove();
    }

    // add the items to the list
    const groupList = queryElement<HTMLDivElement>(`[${attr}="group-list"]`, groupClone);
    if (groupList) {
      items.forEach((item) => {
        if (item.dataset.creditsGroup !== groupName) return;
        groupList.appendChild(item);
      });
    }

    // append the clone to the groups
    groups.appendChild(groupClone);
  });

  // delete the group template
  groupTemplate.remove();

  // delete the button if not needed
  const button = queryElement<HTMLDivElement>(`[${attr}="button"]`, component);
  if (!button) return;
  if (items.length <= 4) {
    button.remove();
    return;
  }

  // toggle the views when clicked
  button.addEventListener('click', () => {
    toggleView(groups, button);
  });

  // toggle the views
  function toggleView(groups: HTMLDivElement, button: HTMLDivElement) {
    const hasClass = groups.classList.contains('is-open');
    if (hasClass) {
      updateButtonText(button, 'View More');
    } else {
      updateButtonText(button, 'View Less');
    }
    groups.classList.toggle('is-open');
  }

  // update button text
  function updateButtonText(button: HTMLDivElement, text: string) {
    const buttonTexts = queryElements<HTMLDivElement>('.button-text', button);
    buttonTexts.forEach((buttonText) => {
      buttonText.textContent = text;
    });
  }

  // delete the initial collection
  const collection = queryElement<HTMLDivElement>(`[${attr}="collection"]`, component);
  if (collection) collection.remove();
};
