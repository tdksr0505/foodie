import React, { useState } from 'react';
import * as Styled from './styledFilter';
import type { TRestaurantDetail } from '@/type';
import Button from '@/components/Button';
import ToggleTag from '@/components/ToggleTag';
import { foodTypeOptions } from '@/utils/foodTypeUtil';

// 依 捷運站
// 依 捷運站
// 依 類型
// 依 有吃過沒吃過

// 依 照分數

interface IFilterProps {
  fetchData: Array<TRestaurantDetail> | null;
  setFilteredData: React.Dispatch<React.SetStateAction<TRestaurantDetail[] | null>>;
}
interface IFilter {
  name: string;
  type: Array<string>;
  mrt: Array<string>;
}

const Filter = ({ fetchData, setFilteredData }: IFilterProps) => {
  const [filter, setFilter] = useState<IFilter>({ name: '', type: [], mrt: [] });
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const onClickSearch = () => {
    //搜尋
    console.log(`搜尋條件`, filter);
    // const filterData = fetchData?.filter((elem) => {
    //   return elem.name.includes(filter.name);
    // });
    // if (filterData) setFilteredData(filterData);
  };
  const onChangeFilter = (e: any) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const onClickFoodType = (label: string, value: boolean) => {
    const foodTypeValue = filter.type;
    const isLabelExist = foodTypeValue.includes(label);
    if (value && !isLabelExist) {
      foodTypeValue.push(label);
    } else if (!value && isLabelExist) {
      let idx = foodTypeValue.indexOf(label);
      foodTypeValue.splice(idx, 1);
    }
    setFilter({ ...filter, type: foodTypeValue });
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

        <Styled.FilterOptionTitle>類型</Styled.FilterOptionTitle>
        <Styled.ToggleTagBox>
          {foodTypeOptions.map((elem) => {
            return <ToggleTag key={elem.label} label={elem.label} onClick={onClickFoodType} />;
          })}
        </Styled.ToggleTagBox>
        <Styled.FilterOptionTitle>捷運站</Styled.FilterOptionTitle>

        <Button onClick={onClickSearch}>查詢</Button>
      </Styled.Filter>
    </>
  );
};

export default Filter;
