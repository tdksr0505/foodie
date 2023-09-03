import { TFilter, TRestaurantData } from '@/type';

const compareMrt = (filterMrt: string[], listItemMrt: string[]) => {
  //比較 filter mrt[] 和 list item的mrt[]
  for (let itemMrt of listItemMrt) {
    if (filterMrt.includes(itemMrt)) {
      return true;
    }
  }
  return false;
};

export const filterData = (listData: TRestaurantData[], filter: TFilter) => {
  const result = listData.filter((elem) => {
    return (
      (filter.keyword === '' || elem.name?.toLowerCase().includes(filter.keyword.toLowerCase())) &&
      (filter.type.length === 0 || filter.type.includes(elem.type || '')) &&
      (filter.mrt.length === 0 || compareMrt(filter.mrt, elem.mrt)) &&
      (filter.isVisited === null || filter.isVisited === elem.isVisited)
    );
  });
  return result;
};
