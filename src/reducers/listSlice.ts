import { createSlice } from '@reduxjs/toolkit';
import type { TRestaurantDetail } from '@/type';

interface IFilter {
  name: string;
  type: Array<string>;
  mrt: Array<string>;
  isVisited: boolean | null;
}
interface IRootState {
  fetchList: TRestaurantDetail[] | null;
  filteredList: TRestaurantDetail[] | null;
  filter: IFilter;
}
const initialFilter = { name: '', type: [], mrt: [], isVisited: null };
const initialState: IRootState = {
  fetchList: null,
  filteredList: null,
  filter: initialFilter,
};
const compareMrt = (filterMrt: Array<string>, listItemMrt: Array<string>) => {
  //比較 filter mrt[] 和 list item的mrt[]
  for (let itemMrt of listItemMrt) {
    if (filterMrt.includes(itemMrt)) {
      return true;
    }
  }
  return false;
};
const filterList = (fetchList: TRestaurantDetail[] | null, filter: IFilter) => {
  if (fetchList) {
    return fetchList.filter((elem) => {
      return (
        (filter.name === '' || elem.name.includes(filter.name)) &&
        (filter.type.length === 0 || filter.type.includes(elem.type)) &&
        (filter.mrt.length === 0 || compareMrt(filter.mrt, elem.mrt)) &&
        (filter.isVisited === null || filter.isVisited === elem.isVisited)
      );
    });
  } else {
    return null;
  }
};
const listSlice = createSlice({
  name: 'list',
  initialState: initialState,
  reducers: {
    initList(state, action) {
      state.fetchList = action.payload;
      state.filteredList = action.payload;
      state.filteredList = filterList(state.fetchList, state.filter);
    },
    setFilter(state, action) {
      console.log(`setFilter`, action.payload);
      state.filter = action.payload;

      //篩選列表
      state.filteredList = filterList(state.fetchList, state.filter);
    },
  },
});

export type { IRootState };
export const { initList, setFilter } = listSlice.actions;
export default listSlice;
