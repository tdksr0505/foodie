import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import WhiteBox from '@/components/WhiteBox';
import { mrtStationOptions } from '../../utils/mrtUtil';
import * as Styled from './styledRestaurantForm';
import RadioGroup from '@/components/RadioGroup';
import { TOption, TRestaurantData } from '@/type';
import Select from '@/components/Select';
import AutoComplete from '@/components/AutoComplete';
import { foodTypeOptions } from '../../utils/foodTypeUtil';
import { SelectChangeEvent } from '@mui/material/Select';
import useSnackbar from '@/hooks/useSnackbar';
import useLoading from '@/hooks/useLoading';
import * as Form from '@/styles/styledFormPage';
import Slider from '@mui/material/Slider';
import { addRestaurant, updateRestaurant } from '@/lib/api';

interface IRestaurantFormProps {
  data?: TRestaurantData;
  title?: string;
  id?: string;
}
const isVisitedConfig: TOption[] = [
  {
    value: true,
    label: '吃過',
  },
  {
    value: false,
    label: '沒吃過',
  },
];
const isReturnVisitedConfig: TOption[] = [
  {
    value: true,
    label: '可回訪',
  },
  {
    value: false,
    label: '不用回訪',
  },
];
const canReserveConfig: TOption[] = [
  {
    value: true,
    label: '可訂位',
  },
  {
    value: false,
    label: '不可訂位',
  },
];
const initailValue: TRestaurantData = {
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
const MIN_RATE = 3.5;
const MAX_RATE = 5;
const RATE_STEP = 0.1;
const RestaurantForm = ({ data, title, id }: IRestaurantFormProps) => {
  const router = useRouter();
  const [formValue, setFormValue] = useState<TRestaurantData>(initailValue);
  const [mrtDefaultOption, setMrtDefaultOption] = useState<TOption[] | null>(null);
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();

  useEffect(() => {
    if (data) {
      const mrtDefaultValue = getMrtDefalutValue(data.mrt);
      setMrtDefaultOption(mrtDefaultValue);
      setFormValue(data);
    }
  }, [data]);

  // text input change事件
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;
    let value = e.target.value;
    setFormValue({
      ...formValue,
      [target.name]: value,
    });
  };

  // radio input change事件
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;
    let value = e.target.value;
    let booleanValue = false;
    // change event的value為string, 須轉為boolean
    if (value === 'true') {
      booleanValue = true;
    }
    setFormValue({
      ...formValue,
      [target.name]: booleanValue,
    });
  };

  // select input change事件
  const handleSelectChange = (e: SelectChangeEvent<unknown>) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  // 選擇捷運站 change事件
  const handleMrtChange = (e: React.SyntheticEvent, value: unknown) => {
    let storeValue = (value as TOption[]).map((elem) => {
      return elem.value;
    });
    setMrtDefaultOption(value as TOption[]);
    setFormValue({
      ...formValue,
      mrt: storeValue,
    });
  };

  // 評分change事件
  const handleRateChange = (event: Event, value: number | number[]) => {
    setFormValue({
      ...formValue,
      rate: value.toString(),
    });
  };

  // 提交表單
  const onSubmit = async () => {
    const { isVisited, isReturnVisited, canReserve, ...rest } = formValue;
    const redirectUrl = id ? `/restaurant/detail/${id}` : `/`;
    setLoading(true);
    const result = id ? await updateRestaurant(id, formValue) : await addRestaurant(formValue);
    setLoading(false);
    result.data.msg && showSnackbar(result.data.msg);
    router.push(redirectUrl);
  };

  /**
   * 取得包含lable和value的捷運站資料
   * @param mrtStations 捷運站id
   * @returns 包含lable和value的捷運站資料
   */
  const getMrtDefalutValue = (mrtStations: string[]): TOption[] => {
    return mrtStationOptions.filter((elem) => {
      return mrtStations.includes(elem.value);
    });
  };

  useEffect(() => {
    // 選擇沒吃過時, 是否回訪value設為null
    if (formValue.isVisited === false) {
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
                <TextField name="name" value={formValue?.name || ''} onChange={handleInputChange} />
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>評分</Form.Label>
              <Form.RightBox>
                <Slider
                  valueLabelDisplay="on"
                  step={RATE_STEP}
                  marks
                  min={MIN_RATE}
                  max={MAX_RATE}
                  value={parseFloat(formValue.rate || MIN_RATE.toString())}
                  onChange={handleRateChange}
                />
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>區域</Form.Label>
              <Form.RightBox>
                <TextField name="simpleAddress" value={formValue?.simpleAddress || ''} onChange={handleInputChange} />
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>地址</Form.Label>
              <Form.RightBox>
                <TextField name="address" value={formValue?.address || ''} onChange={handleInputChange} />
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>電話</Form.Label>
              <Form.RightBox>
                <TextField name="tel" value={formValue?.tel || ''} onChange={handleInputChange} />
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
                  handleChange={handleRadioChange}
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
                  handleChange={handleRadioChange}
                ></RadioGroup>
              </Form.RightBox>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.Label>是否回訪</Form.Label>
              <Form.RightBox>
                <RadioGroup
                  name={'isReturnVisited'}
                  radiosConfig={isReturnVisitedConfig}
                  value={formValue?.isReturnVisited}
                  handleChange={handleRadioChange}
                  disabled={formValue.isVisited === false}
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
