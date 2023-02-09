import foodType from '../config/foodType.json';
import { TOption } from '@/type';

const getFoodTypeOptions = (): Array<TOption> => {
  return foodType.map((type) => {
    return { label: type, value: type };
  });
};

export const foodTypeOptions = getFoodTypeOptions();
