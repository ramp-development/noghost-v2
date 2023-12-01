export const getRandomColor = () => {
  const colors = ['#2a2a2a', '#b8ff1d', '#97b7de', '#fdbf2d', '#3695a3', '#ff5517'];
  const randomIndex = Math.floor(Math.random() * colors.length);

  const randomHexCode = colors[randomIndex];

  return randomHexCode;
};
