export const getRandom = ({min,max}: {
  min: number,
  max: number,
}) => {
  return Math.random() * (max - min) + min;
}
