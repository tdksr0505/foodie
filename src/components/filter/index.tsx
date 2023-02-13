import React, { useState, useEffect } from 'react';
import * as Styled from './styledFilter';
import type { TRestaurantDetail, TOption } from '@/type';
import Button from '@/components/Button';
import ToggleTag from '@/components/ToggleTag';
import Tag from '@/components/Tag';
import { foodTypeOptions } from '@/utils/foodTypeUtil';
import { getFilterMrt, getLineName, getLineColor } from '@/utils/mrtUtil';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
  const [filterMrtOption, setFilterMrtOption] = useState<{ [x: string]: TOption[] }>({});

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

  const onClickFoodType = (e: React.SyntheticEvent, value: boolean) => {
    const name = (e.target as Element).getAttribute('name');
    const foodTypeValue = filter.type;
    if (name) {
      const isNameExist = foodTypeValue.includes(name);
      if (value && !isNameExist) {
        foodTypeValue.push(name);
      } else if (!value && isNameExist) {
        let idx = foodTypeValue.indexOf(name);
        foodTypeValue.splice(idx, 1);
      }
      setFilter({ ...filter, type: foodTypeValue });
    }
  };

  useEffect(() => {
    const mrtStationsID = fetchData?.reduce((pre, cur) => {
      return [...pre, ...cur.mrt];
    }, [] as Array<string>);

    if (mrtStationsID) {
      // 清除重複項目
      const duplicateID = mrtStationsID.filter((element, index) => {
        return mrtStationsID.indexOf(element) === index;
      });
      // console.log(`duplicateID`, duplicateID);
      setFilterMrtOption(getFilterMrt(duplicateID));
    }
    // if (mrtStationsID && mrtStationsID.length > 0) {
    //   console.log(`xx`, getFilterMrt(mrtStationsID));
    //   setFilterMrtOption(getFilterMrt(mrtStationsID));
    // }
  }, [fetchData]);
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
            return <ToggleTag key={elem.value} name={elem.value} label={elem.label} onClick={onClickFoodType} />;
          })}
        </Styled.ToggleTagBox>
        <Styled.FilterOptionTitle>捷運站</Styled.FilterOptionTitle>

        {Object.entries(filterMrtOption).map((lineInfo) => {
          const lineName = getLineName(lineInfo[0]);
          const { fontColor, bgColor } = getLineColor(lineInfo[0]);
          console.log(`bgColor`, bgColor);
          return (
            <Styled.MrtLineBox key={lineInfo[0]}>
              <div>
                <Tag fontColor={fontColor} bgColor={bgColor}>
                  {lineName}
                </Tag>
              </div>
              {lineInfo[1].map((station) => {
                return (
                  <FormControlLabel key={station.value} control={<Checkbox defaultChecked />} label={station.label} />
                );
              })}
            </Styled.MrtLineBox>
          );
        })}

        <Button onClick={onClickSearch}>查詢</Button>
      </Styled.Filter>
    </>
  );
};

export default Filter;
