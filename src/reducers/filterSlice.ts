import { createSlice } from '@reduxjs/toolkit';
import type { TRestaurantDetail } from '@/type';

interface IFilter {
  name: string;
  type: string[];
  mrt: string[];
  isVisited: boolean | null;
}
interface IRootState {
  filter: IFilter;
}
const initialFilter = { name: '', type: [], mrt: [], isVisited: null };
const initialState: IRootState = {
  filter: initialFilter,
};

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState: initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
      //篩選列表
      // state.filteredList = filterList(state.fetchList, state.filter);
    },
  },
});

export type { IRootState };
export const { setFilter } = filterSlice.actions;
export default filterSlice;
