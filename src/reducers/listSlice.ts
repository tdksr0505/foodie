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
const listSlice = createSlice({
  name: 'list',
  initialState: initialState,
  reducers: {
    initList(state, action) {
      state.fetchList = action.payload;
      state.filteredList = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;

      //篩選列表
      if (state.fetchList) {
        state.filteredList = state.fetchList.filter((elem) => {
          return (
            (state.filter.name === '' || elem.name.includes(state.filter.name)) &&
            (state.filter.type.length === 0 || state.filter.type.includes(elem.type)) &&
            (state.filter.mrt.length === 0 || compareMrt(state.filter.mrt, elem.mrt)) &&
            (state.filter.isVisited === null || state.filter.isVisited === elem.isVisited)
          );
        });
      }
    },
  },
});

export type { IRootState };
export const { initList, setFilter } = listSlice.actions;
export default listSlice;
