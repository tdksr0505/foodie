import React, { useState } from 'react';
import * as Styled from './styledFilter';
import type { TRestaurantDetail } from '@/type';

// 依 捷運站
// 依 類型
// 依 有吃過沒吃過
// 依 照分數

interface IFilterProps {
  fetchData: Array<TRestaurantDetail> | null;
  setFilterData: React.Dispatch<React.SetStateAction<TRestaurantDetail[] | null>>;
}
const Filter = ({ fetchData, setFilterData }: IFilterProps) => {
  const [filter, setFilter] = useState({ name: 'd' });
  const onClickSearch = () => {
    const filterData = fetchData?.filter((elem) => {
      return elem.name.includes(filter.name);
    });
    if (filterData) setFilterData(filterData);
  };
  const onChangeFilter = (e: any) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Styled.Filter>
        <input type="text" name="name" value={filter.name} onChange={onChangeFilter} />
        <input type="checkbox" id="subscribeNews" name="subscribe" value="newsletter" />
        <button onClick={onClickSearch}>查詢</button>
      </Styled.Filter>
    </>
  );
};

export default Filter;
