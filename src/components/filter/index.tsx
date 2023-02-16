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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
// 依 名稱
// 依 類型
// 依 捷運站
// 依 有吃過沒吃過

// 依 照分數

interface IFilterProps {
  fetchData: Array<TRestaurantDetail> | null;
  setFilteredData: React.Dispatch<React.SetStateAction<TRestaurantDetail[] | null>>;
  filterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IFilter {
  name: string;
  type: Array<string>;
  mrt: Array<string>;
  isVisited: boolean | null;
}

const filterInitValue: IFilter = { name: '', type: [], mrt: [], isVisited: null };
const compareMrt = (filterMrt: Array<string>, listItemMrt: Array<string>) => {
  //比較 filter mrt[] 和 list item的mrt[]
  for (let itemMrt of listItemMrt) {
    if (filterMrt.includes(itemMrt)) {
      return true;
    }
  }
  return false;
};
const Filter = ({ fetchData, setFilteredData, filterOpen, setFilterOpen }: IFilterProps) => {
  const [filter, setFilter] = useState<IFilter>(filterInitValue);
  const [filterMrtOption, setFilterMrtOption] = useState<{ [x: string]: TOption[] }>({});

  const handleReset = () => {
    setFilter({ name: '', type: [], mrt: [], isVisited: null });
    setFilteredData(fetchData);
  };

  const handleSearch = () => {
    //點擊搜尋
    console.log(`搜尋條件`, filter);
    setFilterOpen(false);
    if (filter.name === '' && filter.type.length === 0 && filter.mrt.length === 0 && filter.isVisited === null) {
      //無篩選條件
      handleReset();
      return;
    }

    const filterData = fetchData?.filter((elem) => {
      return (
        (filter.name === '' || elem.name.includes(filter.name)) &&
        (filter.type.length === 0 || filter.type.includes(elem.type)) &&
        (filter.mrt.length === 0 || compareMrt(filter.mrt, elem.mrt)) &&
        (filter.isVisited === null || filter.isVisited === elem.isVisited)
      );
    });
    if (filterData) setFilteredData(filterData);
  };
  const onChangeFilter = (e: any) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleFoodTypeChange = (e: React.SyntheticEvent, value: boolean) => {
    // 點擊餐廳類型事件
    const name = (e.target as Element).getAttribute('name');
    const foodTypeValue = filter.type;
    if (name) {
      const isNameExist = foodTypeValue.includes(name);
      if (value && !isNameExist) {
        foodTypeValue.push(name);
      } else if (!value && isNameExist) {
        foodTypeValue.splice(foodTypeValue.indexOf(name), 1);
      }
      setFilter({ ...filter, type: foodTypeValue });
    }
  };

  const handleMrtChange = (e: React.SyntheticEvent<Element, Event>, checked: boolean) => {
    // 點擊捷運站事件
    const mrtValue = filter.mrt;
    const name = (e.target as Element).getAttribute('name');
    if (name) {
      if (checked && !mrtValue.includes(name)) {
        mrtValue.push(name);
      } else if (!checked && mrtValue.includes(name)) {
        mrtValue.splice(mrtValue.indexOf(name), 1);
      }
      setFilter({ ...filter, mrt: mrtValue });
    }
  };
  const handleVisitedChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setFilter({ ...filter, isVisited: value === 'true' ? true : false });
  };
  useEffect(() => {
    // 生成資料有包含的捷運站
    console.log(`fetchData`, fetchData);
    const mrtStationsID = fetchData?.reduce((pre, cur) => {
      return [...pre, ...cur.mrt];
    }, [] as Array<string>);

    if (mrtStationsID) {
      // 清除重複項目
      const duplicateID = mrtStationsID.filter((element, index) => {
        return mrtStationsID.indexOf(element) === index;
      });
      setFilterMrtOption(getFilterMrt(duplicateID));
    }
  }, [fetchData]);

  return (
    <>
      <Styled.Filter isOpen={filterOpen}>
        <Styled.FilterMainBox>
          <Styled.CloseBtnBox
            onClick={() => {
              setFilterOpen(false);
            }}
          >
            <Styled.CloseBtn />
          </Styled.CloseBtnBox>
          <Styled.InputBox>
            <Styled.SearchInput name="name" value={filter.name} onChange={onChangeFilter} />
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
        </Styled.FilterMainBox>
        <Styled.ButtonBox>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleSearch}>查詢</Button>
        </Styled.ButtonBox>
      </Styled.Filter>
    </>
  );
};

export default Filter;
