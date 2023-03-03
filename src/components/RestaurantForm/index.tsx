import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import WhiteBox from '@/components/WhiteBox';
import { mrtStationOptions } from '../../utils/mrtUtil';
import * as Styled from './styledRestaurantForm';
import RadioGroup from '@/components/RadioGroup';
import { TOption, TRestaurantFormData, TRestaurantDetail } from '@/type';
import Select from '@/components/Select';
import AutoComplete from '@/components/AutoComplete';
import { foodTypeOptions } from '../../utils/foodTypeUtil';
import { SelectChangeEvent } from '@mui/material/Select';
import useSnackbar from '@/hooks/useSnackbar';
import useLoading from '@/hooks/useLoading';
import * as Form from '@/styles/styledFormPage';
import Slider from '@mui/material/Slider';

interface IRestaurantFormProps {
  data?: TRestaurantDetail;
  title?: string;
  id?: string | string[];
}
const isVisitedConfig: Array<TOption> = [
  {
    value: 'true',
    label: '吃過',
  },
  {
    value: 'false',
    label: '沒吃過',
  },
];
const isReturnVisitedConfig: Array<TOption> = [
  {
    value: 'true',
    label: '可回訪',
  },
  {
    value: 'false',
    label: '不用回訪',
  },
];
const canReserveConfig: Array<TOption> = [
  {
    value: 'true',
    label: '可訂位',
  },
  {
    value: 'false',
    label: '不可訂位',
  },
];
const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
const RestaurantForm = ({ data, title, id }: IRestaurantFormProps) => {
  const router = useRouter();
  const initailValue: TRestaurantFormData = {
    name: null,
    simpleAddress: null,
    address: null,
    tel: null,
    type: foodTypeOptions[0].value,
    mrt: [],
    isVisited: isVisitedConfig[0].value,
    isReturnVisited: null,
    rate: null,
    canReserve: canReserveConfig[0].value,
  };

  const [formValue, setFormValue] = useState<TRestaurantFormData>(initailValue);
  const [mrtDefaultOption, setMrtDefaultOption] = useState<Array<TOption> | null>(null);
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();

  useEffect(() => {
    if (data) {
      const mrtDefaultValue = getMrtDefalutValue(data.mrt);
      setMrtDefaultOption(mrtDefaultValue);
      const { isVisited, canReserve, isReturnVisited, ...rest } = data;
      const formData = {
        ...rest,
        isVisited: isVisited ? 'true' : 'false',
        canReserve: canReserve ? 'true' : 'false',
        isReturnVisited: isReturnVisited === null ? null : data.isReturnVisited ? 'true' : 'false',
      };
      setFormValue(formData);
    }
  }, [data]);
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;
    let value: boolean | string = e.target.value;
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

  const handleRateChange = (event: Event, value: number | number[]) => {
    setFormValue({
      ...formValue,
      rate: value.toString(),
    });
  };

  const onSubmit = () => {
    const fetchUrl = id ? `${BASE_API_URL}/api/restaurant/${id}` : `${BASE_API_URL}/api/restaurant`;
    const returnUrl = id ? `/restaurant/detail/${id}` : `/`;
    const { isVisited, isReturnVisited, canReserve, ...rest } = formValue;
    const submitValue = {
      ...rest,
      isVisited: isVisited === 'true',
      isReturnVisited: isReturnVisited === null ? null : isReturnVisited === 'true',
      canReserve: canReserve === 'true',
    };
    setLoading(true);
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitValue),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        showSnackbar(result.data.msg);
        router.push(returnUrl);
      });
  };
  const getMrtDefalutValue = (mrtStations: Array<string>): Array<TOption> => {
    return mrtStationOptions.filter((elem) => {
      return mrtStations.includes(elem.value);
    });
  };

  useEffect(() => {
    // 選擇沒吃過時, 是否回訪value設為null
    if (formValue.isVisited === 'false') {
      setFormValue({
        ...formValue,
        isReturnVisited: null,
      });
    }
  }, [formValue.isVisited]);
  return (
    <>
      <WhiteBox>
        {(id && data) || !id ? (
          <>
            {title && <Form.FormTitle>{title}</Form.FormTitle>}
            <Form.FormGroup>
              <Form.Label>餐廳名稱</Form.Label>
              <Form.RightBox>
                <TextField name="name" value={formValue?.name || ''} onChange={handleValueChange} />
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>評分</Form.Label>
              <Form.RightBox>
                <Slider
                  valueLabelDisplay="on"
                  step={0.1}
                  marks
                  min={3.5}
                  max={5}
                  value={parseFloat(formValue.rate || '3.5')}
                  onChange={handleRateChange}
                />
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
                  options={mrtStationOptions}
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
                  value={formValue?.canReserve}
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
                  value={formValue?.isVisited}
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
                  value={formValue?.isReturnVisited || null}
                  handleChange={handleValueChange}
                  disabled={formValue.isVisited === 'false'}
                ></RadioGroup>
              </Form.RightBox>
            </Form.FormGroup>

            <Form.ButtonArea center>
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

export default RestaurantForm;
