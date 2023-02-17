import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import WhiteBox from '@/components/WhiteBox';
import { getAllStationOptions } from '../../utils/mrtUtil';
import * as Styled from './styledRestaurantForm';
import RadioGroup from '@/components/RadioGroup';
import { TOption, TRestaurantFormData } from '@/type';
import Select from '@/components/Select';
import AutoComplete from '@/components/AutoComplete';
import { foodTypeOptions } from '../../utils/foodTypeUtil';
import { SelectChangeEvent } from '@mui/material/Select';
import useSnackbar from '@/hooks/useSnackbar';
import useLoading from '@/hooks/useLoading';
import * as Form from '@/styles/styledFormPage';

interface IRestaurantFormProps {
  data?: TRestaurantFormData;
  title?: string;
  id?: string | string[];
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

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export default ({ data, title, id }: IRestaurantFormProps) => {
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
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();

  const allStationOptions = getAllStationOptions();
  useEffect(() => {
    if (data) {
      const mrtDefaultValue = getMrtDefalutValue(data.mrt);
      setMrtDefaultOption(mrtDefaultValue);
      setFormValue(data);
    }
  }, [data]);
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      mrt: storeValue,
    });
  };
  const onSubmit = () => {
    const fetchUrl = id ? `${BASE_API_URL}/api/restaurant/${id}` : `${BASE_API_URL}/api/restaurant`;
    const returnUrl = id ? `/restaurant/detail/${id}` : `/`;
    setLoading(true);
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValue),
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        showSnackbar(json.data.msg);
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
        {(id && data) || !id ? (
          <>
            {title && <Styled.PageTitle>{title}</Styled.PageTitle>}
            <Form.FormGroup>
              <Form.Label>餐廳名稱</Form.Label>
              <Form.RightBox>
                <TextField name="name" value={data?.name || ''} onChange={handleValueChange} />
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>評分</Form.Label>
              <Form.RightBox>
                <TextField name="rate" value={formValue?.rate || ''} onChange={handleValueChange} />
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>簡易地址</Form.Label>
              <Form.RightBox>
                <TextField name="simpleAddress" value={formValue?.simpleAddress || ''} onChange={handleValueChange} />
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>地址</Form.Label>
              <Form.RightBox>
                <TextField name="address" value={formValue?.address || ''} onChange={handleValueChange} />
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>電話</Form.Label>
              <Form.RightBox>
                <TextField name="tel" value={formValue?.tel || ''} onChange={handleValueChange} />
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>餐廳類型</Form.Label>
              <Form.RightBox>
                <Select
                  options={foodTypeOptions}
                  name="type"
                  value={formValue?.type || ''}
                  handleChange={handleSelectChange}
                />
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>最近捷運站</Form.Label>
              <Form.RightBox>
                <AutoComplete
                  options={allStationOptions}
                  name="mrt"
                  handleChange={handleMrtChange}
                  value={mrtDefaultOption || []}
                />
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>是否可訂位</Form.Label>
              <Form.RightBox>
                <RadioGroup
                  name={'canReserve'}
                  radiosConfig={canReserveConfig}
                  value={formValue?.canReserve.toString()}
                  handleChange={handleValueChange}
                ></RadioGroup>
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>是否吃過</Form.Label>
              <Form.RightBox>
                <RadioGroup
                  name={'isVisited'}
                  radiosConfig={isVisitedConfig}
                  value={formValue?.isVisited.toString()}
                  handleChange={handleValueChange}
                ></RadioGroup>
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>是否回訪</Form.Label>
              <Form.RightBox>
                <RadioGroup
                  name={'isReturnVisited'}
                  radiosConfig={isReturnVisitedConfig}
                  value={formValue?.isReturnVisited.toString()}
                  handleChange={handleValueChange}
                ></RadioGroup>
              </Form.RightBox>
            </Form.FormGroup>

            <Form.ButtonArea>
              <Link href={id ? `/restaurant/detail/${id}` : '/'}>
                <Styled.BackButton>返回</Styled.BackButton>
              </Link>
              <Button onClick={onSubmit}>送出</Button>
            </Form.ButtonArea>
          </>
        ) : (
          <div>loading...</div>
        )}
      </WhiteBox>
    </>
  );
};
