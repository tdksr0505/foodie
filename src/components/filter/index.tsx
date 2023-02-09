import React, { useState } from 'react';
import * as Styled from './styledFilter';
import type { TRestaurantDetail } from '@/type';
import Button from '@/components/Button';
import { foodTypeOptions } from '@/utils/foodTypeUtil';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// 依 捷運站
// 依 捷運站
// 依 類型
// 依 有吃過沒吃過

// 依 照分數

interface IFilterProps {
  fetchData: Array<TRestaurantDetail> | null;
  setFilterData: React.Dispatch<React.SetStateAction<TRestaurantDetail[] | null>>;
}
interface IFilter {
  name: string;
  type: Array<string>;
  mrt: Array<string>;
}

const Filter = ({ fetchData, setFilterData }: IFilterProps) => {
  const [filter, setFilter] = useState({ name: '' });
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

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

  const toggleFilter = () => {
    setFilterOpen((filterOpen) => !filterOpen);
  };
  return (
    <>
      <Styled.FilterButton onClick={toggleFilter}>
        <Styled.FilterIcon />
      </Styled.FilterButton>
      <Styled.Filter isOpen={filterOpen}>
        <Styled.CloseBtnBox onClick={toggleFilter}>
          <Styled.CloseBtn />
        </Styled.CloseBtnBox>
        <Styled.InputBox>
          <Styled.SearchInput name="name" value={filter.name} onChange={onChangeFilter} />
          <Styled.SearchIcon />
        </Styled.InputBox>
        {foodTypeOptions.map((elem) => {
          return <FormControlLabel control={<Checkbox defaultChecked />} key={elem.label} label={elem.label} />;
        })}
        <Button onClick={onClickSearch}>查詢</Button>
      </Styled.Filter>
    </>
  );
};

export default Filter;
