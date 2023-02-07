import foodType from '../config/foodType.json';

export interface IFoodTypeOption {
  label: string;
  value: string;
}
export const getFoodTypeOptions = () => {
  return foodType.map((type) => {
    return { label: type, value: type };
  });
};
