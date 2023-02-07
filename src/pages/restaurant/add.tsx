import { useEffect, useState } from 'react';
import Link from 'next/link';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import type { TRestaurantDetail } from '@/type';
import { getStationName, getTagColor, getAllStationOptions } from '../../utils/mrtUtil';
import * as Styled from '../../styled/styledAdd';
import Tabs, { ITab } from '../../components/Tabs';
// export type TRestaurantDetail = {
//   _id: string;
//   name: string;
//   simpleAddress: string;
//   address: string;
//   tel: string;
//   type: string;
//   mrt: Array<string>;
//   isVisited: boolean;
//   isReturnVisted: boolean;
//   rate: string;
//   canReserve: boolean;
// };
const isVisitedConfig: Array<ITab> = [
  {
    value: 1,
    label: '吃過',
  },
  {
    value: 0,
    label: '沒吃過',
  },
];
interface IFormData {}
export default function RestaurantAdd() {
  const initialValues = {
    name: null,
    simpleAddress: null,
    address: null,
    tel: null,
    type: null,
    mrt: [],
    isVisited: false,
    isReturnVisted: false,
    rate: null,
    canReserve: false,
  };
  const [values, setValues] = useState(initialValues);
  const [isVisited, setVisted] = useState<number | string>(isVisitedConfig[0].value);
  const handleChangeVisited = (event: React.SyntheticEvent, value: number) => {
    console.log(event);
    console.log(value);
    setVisted(value);
  };
  const handleChange = (e: any) => {
    console.log(e);
  };
  return (
    <>
      <Styled.FormBox>
        <Styled.FormGroup>
          <Styled.Label>餐廳名稱</Styled.Label>
          <Styled.RightBox>
            <TextField />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>評分</Styled.Label>
          <Styled.RightBox>
            <TextField />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>簡易地址</Styled.Label>
          <Styled.RightBox>
            <TextField />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>地址</Styled.Label>
          <Styled.RightBox>
            <TextField />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>電話</Styled.Label>
          <Styled.RightBox>
            <TextField />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>餐廳類型</Styled.Label>
          <Styled.RightBox>
            <TextField />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>最近捷運站</Styled.Label>
          <Styled.RightBox>
            <TextField />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>是否吃過</Styled.Label>
          <Styled.RightBox>
            <Tabs tabsConfig={isVisitedConfig} value={isVisited} handleChange={handleChangeVisited} />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>是否回訪</Styled.Label>
          <Styled.RightBox>
            <TextField />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.FormGroup>
          <Styled.Label>是否可訂位</Styled.Label>
          <Styled.RightBox>
            <TextField />
          </Styled.RightBox>
        </Styled.FormGroup>
        <Styled.ButtonArea>
          <Button>送出</Button>
        </Styled.ButtonArea>
      </Styled.FormBox>

      <Link href="/">返回</Link>
    </>
  );
}
