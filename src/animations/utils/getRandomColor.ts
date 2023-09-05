export const getRandomColor = () => {
  const colors = ['#FF6022', '#208495'];
  const randomIndex = Math.floor(Math.random() * colors.length);

  const randomHexCode = colors[randomIndex];

  return randomHexCode;
};
