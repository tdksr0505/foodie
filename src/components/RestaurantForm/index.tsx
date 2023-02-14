import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import WhiteBox from '@/components/WhiteBox';
import { allStationOptions } from '../../utils/mrtUtil';
import * as Styled from './styledRestaurantForm';
import RadioGroup from '@/components/RadioGroup';
import { TOption, TRestaurantFormData } from '@/type';
import Select from '@/components/Select';
import AutoComplete from '@/components/AutoComplete';
import { foodTypeOptions } from '../../utils/foodTypeUtil';
import { SelectChangeEvent } from '@mui/material/Select';

interface IRestaurantFormProps {
  data?: TRestaurantFormData;
  title?: string;
  id?: string | string[];
  loading?: boolean;
}
const isVisitedConfig: Array<TOption> = [
  {
    value: true,
    label: '吃過',
  },
  {
    value: false,
    label: '沒吃過',
  },
];
const isReturnVisitedConfig: Array<TOption> = [
  {
    value: true,
    label: '可回訪',
  },
  {
    value: false,
    label: '不用回訪',
  },
];
const canReserveConfig: Array<TOption> = [
  {
    value: true,
    label: '可預訂',
  },
  {
    value: false,
    label: '不可預訂',
  },
];

export default ({ data, title, id, loading }: IRestaurantFormProps) => {
  const router = useRouter();
  const initailValue: TRestaurantFormData = {
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

  const [formValue, setFormValue] = useState<TRestaurantFormData>(initailValue);
  const [mrtDefaultOption, setMrtDefaultOption] = useState<Array<TOption> | null>(null);
  console.log(formValue);
  useEffect(() => {
    if (data) {
      setMrtDefaultOption(getMrtDefalutValue(data.mrt));
      setFormValue(data);
    }
  }, [data]);
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    let target = e.target as HTMLInputElement;
    let value: boolean | string = e.target.value;
    if (e.target.type === 'radio') {
      value = e.target.value === 'true';
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
  const handleMrtChange = (e: React.SyntheticEvent, value: unknown) => {
    let storeValue = (value as Array<TOption>).map((elem) => {
      return elem.value;
    });
    setMrtDefaultOption(value as Array<TOption>);
    setFormValue({
      ...formValue,
      // @ts-ignore
      mrt: storeValue,
    });
  };
  const onSubmit = () => {
    console.log(formValue);
    const fetchUrl = id ? `/api/restaurant/${id}` : `/api/restaurant`;
    const returnUrl = id ? `/restaurant/detail/${id}` : `/`;
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValue),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data.msg);
        router.push(returnUrl);
      });
  };
  const getMrtDefalutValue = (mrtStations: Array<string>): Array<TOption> => {
    return allStationOptions.filter((elem) => {
      return mrtStations.includes(elem.value);
    });
  };
  return (
    <>
      <WhiteBox>
        {!loading || data ? (
          <>
            {title && <Styled.PageTitle>{title}</Styled.PageTitle>}
            <Styled.FormGroup>
              <Styled.Label>餐廳名稱</Styled.Label>
              <Styled.RightBox>
                <TextField name="name" value={formValue?.name || ''} onChange={handleValueChange} />
              </Styled.RightBox>
            </Styled.FormGroup>
            <Styled.FormGroup>
              <Styled.Label>評分</Styled.Label>
              <Styled.RightBox>
                <TextField name="rate" value={formValue?.rate || ''} onChange={handleValueChange} />
              </Styled.RightBox>
            </Styled.FormGroup>
            <Styled.FormGroup>
              <Styled.Label>簡易地址</Styled.Label>
              <Styled.RightBox>
                <TextField name="simpleAddress" value={formValue?.simpleAddress || ''} onChange={handleValueChange} />
              </Styled.RightBox>
            </Styled.FormGroup>
            <Styled.FormGroup>
              <Styled.Label>地址</Styled.Label>
              <Styled.RightBox>
                <TextField name="address" value={formValue?.address || ''} onChange={handleValueChange} />
              </Styled.RightBox>
            </Styled.FormGroup>
            <Styled.FormGroup>
              <Styled.Label>電話</Styled.Label>
              <Styled.RightBox>
                <TextField name="tel" value={formValue?.tel || ''} onChange={handleValueChange} />
              </Styled.RightBox>
            </Styled.FormGroup>
            <Styled.FormGroup>
              <Styled.Label>餐廳類型</Styled.Label>
              <Styled.RightBox>
                <Select
                  options={foodTypeOptions}
                  name="type"
                  value={formValue?.type || ''}
                  handleChange={handleSelectChange}
                />
              </Styled.RightBox>
            </Styled.FormGroup>
            <Styled.FormGroup>
              <Styled.Label>最近捷運站</Styled.Label>
              <Styled.RightBox>
                <AutoComplete
                  options={allStationOptions}
                  name="mrt"
                  handleChange={handleMrtChange}
                  value={mrtDefaultOption || []}
                />
              </Styled.RightBox>
            </Styled.FormGroup>
            <Styled.FormGroup>
              <Styled.Label>是否可訂位</Styled.Label>
              <Styled.RightBox>
                <RadioGroup
                  name={'canReserve'}
                  radiosConfig={canReserveConfig}
                  value={formValue?.canReserve.toString()}
                  handleChange={handleValueChange}
                ></RadioGroup>
              </Styled.RightBox>
            </Styled.FormGroup>
            <Styled.FormGroup>
              <Styled.Label>是否吃過</Styled.Label>
              <Styled.RightBox>
                <RadioGroup
                  name={'isVisited'}
                  radiosConfig={isVisitedConfig}
                  value={formValue?.isVisited.toString()}
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
                  value={formValue?.isReturnVisited.toString()}
                  handleChange={handleValueChange}
                ></RadioGroup>
              </Styled.RightBox>
            </Styled.FormGroup>

            <Styled.ButtonArea>
              <Button href={id ? `/restaurant/detail/${id}` : '/'}>返回</Button>
              <Button onClick={onSubmit}>送出</Button>
            </Styled.ButtonArea>
          </>
        ) : (
          <div>loading...</div>
        )}
      </WhiteBox>
    </>
  );
};
