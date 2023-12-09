type WeightedRandomString = {
  weight: number;
  value: string;
};

export const getWeightedRandomString = (items: WeightedRandomString[]): () => string => {
  const weights = items.reduce((acc: number[], item, i: number) => {
    acc.push(item.weight + (acc[i - 1] ?? 0));
    return acc;
  }, []);

  return () => {
    const random: number = Math.random() * weights[weights.length - 1];
    return items[weights.findIndex((weight: number) => weight > random)]?.value;
  }
};