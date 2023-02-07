import { useEffect, useState } from 'react';
import Link from 'next/link';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import type { TRestaurantDetail } from '@/type';
import { getStationName, getTagColor, getAllStationOptions } from '../../utils/mrtUtil';
import * as Styled from '../../styled/styledAdd';
import RadioGroup from '../../components/RadioGroup';
import { TOption } from '@/type';
import Select from '../../components/Select';
import AutoComplete from '../../components/AutoComplete';

import { getFoodTypeOptions } from '../../utils/foodTypeUtil';
import { SelectChangeEvent } from '@mui/material/Select';

interface IFormData {
  name: string | null;
  simpleAddress: string | null;
  address: string | null;
  tel: string | null;
  type: string | undefined;
  mrt: Array<string>;
  isVisited: string;
  isReturnVisited: string;
  rate: string | null;
  canReserve: string;
}
const isVisitedConfig: Array<TOption> = [
  {
    value: '1',
    label: '吃過',
  },
  {
    value: '0',
    label: '沒吃過',
  },
];
const isReturnVisitedConfig: Array<TOption> = [
  {
    value: '1',
    label: '可回訪',
  },
  {
    value: '0',
    label: '不用回訪',
  },
];
const canReserveConfig: Array<TOption> = [
  {
    value: '1',
    label: '可預訂',
  },
  {
    value: '0',
    label: '不可預訂',
  },
];

const foodTypeOptions = getFoodTypeOptions();
const mrtStationOptions = getAllStationOptions();
export default function RestaurantAdd() {
  const initailValue: IFormData = {
    name: null,
    simpleAddress: null,
    address: null,
    tel: null,
    type: foodTypeOptions[0].value,
    mrt: [],
    isVisited: isVisitedConfig[0].value,
    isReturnVisited: isReturnVisitedConfig[0].value,
    rate: null,
    canReserve: canReserveConfig[0].value,
  };
  const [formValue, setFormValue] = useState(initailValue);
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    let target = e.target as HTMLInputElement;
    let value: boolean | string = e.target.value;
    if (e.target.type === 'radio') {
      value = parseInt(e.target.value) > 0 ? true : false;
    }
    setFormValue({
      ...formValue,
      [target.name]: value,
    });
  };
  const handleSelectChange = (e: SelectChangeEvent<unknown>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleAutoCompleteChange = (e: React.SyntheticEvent, value: Array<TOption>) => {
    let storeValue = value.map((elem) => {
      return elem.value;
    });
    setFormValue({
      ...formValue,
      // @ts-ignore
      [e.target.dataset.name]: storeValue,
    });
  };
  const onSubmit = () => {
    console.log(formValue);
  };
  return (
    <>
      <Styled.FormBox>
        <Styled.PageTitle>New</Styled.PageTitle>
        <Styled.FormGroup>
          <Styled.Label>餐廳名稱</Styled.Label>
          <Styled.RightBox>
            <TextField name="name" onChange={handleValueChange} />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>評分</Styled.Label>
          <Styled.RightBox>
            <TextField name="rate" onChange={handleValueChange} />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>簡易地址</Styled.Label>
          <Styled.RightBox>
            <TextField name="simpleAddress" onChange={handleValueChange} />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>地址</Styled.Label>
          <Styled.RightBox>
            <TextField name="address" onChange={handleValueChange} />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>電話</Styled.Label>
          <Styled.RightBox>
            <TextField name="tel" type="number" onChange={handleValueChange} />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>餐廳類型</Styled.Label>
          <Styled.RightBox>
            <Select
              options={foodTypeOptions}
              name="type"
              defaultValue={formValue.type!}
              handleChange={handleSelectChange}
            />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>最近捷運站</Styled.Label>
          <Styled.RightBox>
            <AutoComplete
              options={mrtStationOptions}
              name="mrt"
              defaultValue={[mrtStationOptions[0]]}
              handleChange={handleAutoCompleteChange}
            />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>是否吃過</Styled.Label>
          <Styled.RightBox>
            <RadioGroup
              name={'isVisited'}
              radiosConfig={isVisitedConfig}
              defaultValue={formValue.isVisited}
              handleChange={handleValueChange}
            ></RadioGroup>
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>是否回訪</Styled.Label>
          <Styled.RightBox>
            <RadioGroup
              name={'isReturnVisited'}
              radiosConfig={isReturnVisitedConfig}
              defaultValue={formValue.isReturnVisited}
              handleChange={handleValueChange}
            ></RadioGroup>
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>是否可訂位</Styled.Label>
          <Styled.RightBox>
            <RadioGroup
              name={'canReserve'}
              radiosConfig={canReserveConfig}
              defaultValue={formValue.canReserve}
              handleChange={handleValueChange}
            ></RadioGroup>
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.ButtonArea>
          <Button onClick={onSubmit}>送出</Button>
        </Styled.ButtonArea>
      </Styled.FormBox>

      <Link href="/">返回</Link>
    </>
  );
}
