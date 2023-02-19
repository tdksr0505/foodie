import { configureStore } from '@reduxjs/toolkit';
import listSlice from '@/reducers/listSlice';
const store = configureStore({
  reducer: {
    list: listSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
