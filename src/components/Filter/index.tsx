import React, { useState, useEffect } from 'react';
import * as Styled from './styledFilter';
import { TOption } from '@/type';
import Button from '@/components/Button';
import ToggleTag from '@/components/ToggleTag';
import Tag from '@/components/Tag';
import { foodTypeOptions } from '@/utils/foodTypeUtil';
import { getFilterMrt, getLineName, getLineColor } from '@/utils/mrtUtil';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '@/reducers/filterSlice';
import type { RootState } from '@/store';
import type { TRestaurantData } from '@/type';

interface IFilterProps {
  filterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  listData: TRestaurantData[];
}

const Filter = ({ filterOpen, setFilterOpen, listData }: IFilterProps) => {
  const filter = useSelector((state: RootState) => state.filter).filter;
  const dispatch = useDispatch();
  const [filterMrtOption, setFilterMrtOption] = useState<{ [x: string]: TOption[] }>({});

  const handleReset = () => {
    dispatch(setFilter({ name: '', type: [], mrt: [], isVisited: null }));
  };

  const handleKeywordChange = (e: any) => {
    dispatch(setFilter({ ...filter, [e.target.name]: e.target.value }));
  };

  const handleFoodTypeChange = (e: React.SyntheticEvent, value: boolean) => {
    // 點擊餐廳類型事件
    const name = (e.target as Element).getAttribute('name');
    const foodTypeValue = [...filter.type];
    if (name) {
      const isNameExist = foodTypeValue.includes(name);
      if (value && !isNameExist) {
        foodTypeValue.push(name);
      } else if (!value && isNameExist) {
        foodTypeValue.splice(foodTypeValue.indexOf(name), 1);
      }
      dispatch(setFilter({ ...filter, type: foodTypeValue }));
    }
  };

  const handleMrtChange = (e: React.SyntheticEvent<Element, Event>, checked: boolean) => {
    // 點擊捷運站事件
    const mrtValue = [...filter.mrt];
    const name = (e.target as Element).getAttribute('name');
    if (name) {
      if (checked && !mrtValue.includes(name)) {
        mrtValue.push(name);
      } else if (!checked && mrtValue.includes(name)) {
        mrtValue.splice(mrtValue.indexOf(name), 1);
      }
      dispatch(setFilter({ ...filter, mrt: mrtValue }));
    }
  };
  const handleVisitedChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    dispatch(setFilter({ ...filter, isVisited: value === 'true' ? true : false }));
  };
  useEffect(() => {
    // 生成資料有包含的捷運站
    const mrtStationsID = listData?.reduce((pre, cur) => {
      return [...pre, ...cur.mrt];
    }, [] as string[]);

    if (mrtStationsID) {
      // 清除重複項目
      const duplicateID = mrtStationsID.filter((element, index) => {
        return mrtStationsID.indexOf(element) === index;
      });
      setFilterMrtOption(getFilterMrt(duplicateID));
    }
  }, [listData]);

  const handleFilterClose = () => {
    setFilterOpen(false);
  };
  return (
    <>
      <Styled.Filter isOpen={filterOpen}>
        <Styled.CloseBtnBox onClick={handleFilterClose}>
          <Styled.CloseBtn />
        </Styled.CloseBtnBox>
        <Styled.FilterOptions>
          <Styled.InputBox>
            <Styled.SearchInput name="name" value={filter.name} onChange={handleKeywordChange} />
            <Styled.SearchIcon />
          </Styled.InputBox>

          <Styled.FilterOptionTitle>類型</Styled.FilterOptionTitle>
          <Styled.ToggleTagBox>
            {foodTypeOptions.map((elem) => {
              return (
                <ToggleTag
                  key={elem.value}
                  name={elem.value}
                  label={elem.label}
                  value={filter.type.includes(elem.value)}
                  onClick={handleFoodTypeChange}
                />
              );
            })}
          </Styled.ToggleTagBox>
          <Styled.FilterOptionTitle>捷運站</Styled.FilterOptionTitle>

          {Object.entries(filterMrtOption).map((lineInfo) => {
            const lineName = getLineName(lineInfo[0]);
            const { fontColor, bgColor } = getLineColor(lineInfo[0]);
            return (
              <Styled.MrtLineBox key={lineInfo[0]}>
                <div>
                  <Tag fontColor={fontColor} bgColor={bgColor}>
                    {lineName}
                  </Tag>
                </div>
                {lineInfo[1].map((station) => {
                  return (
                    <FormControlLabel
                      key={station.value}
                      control={<Checkbox checked={filter.mrt.includes(station.value)} />}
                      label={station.label}
                      name={station.value}
                      onChange={handleMrtChange}
                    />
                  );
                })}
              </Styled.MrtLineBox>
            );
          })}
          <Styled.FilterOptionTitle mt>吃過沒</Styled.FilterOptionTitle>
          <RadioGroup row value={filter.isVisited} onChange={handleVisitedChange}>
            <FormControlLabel value={true} control={<Radio />} label="吃過了" />
            <FormControlLabel value={false} control={<Radio />} label="沒吃過" />
          </RadioGroup>
        </Styled.FilterOptions>
        <Styled.ButtonBox>
          <Button onClick={handleReset}>Reset</Button>
          <Styled.MobileConfirmButton onClick={handleFilterClose}>Ok</Styled.MobileConfirmButton>
        </Styled.ButtonBox>
      </Styled.Filter>
    </>
  );
};

export default Filter;
