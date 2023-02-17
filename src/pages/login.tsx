import { useEffect, useState } from 'react';
import TextField from '@/components/TextField';
import WhiteBox from '@/components/WhiteBox';
import * as FormStyled from '@/styles/styledFormPage';
import Button from '@/components/Button';

interface IFormValue {
  account: string;
  password: string;
}
const initFormValue = {
  account: '',
  password: '',
};
export default () => {
  const [formValue, setFormValue] = useState<IFormValue>(initFormValue);
  const handleLogin = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: formValue.account,
        password: formValue.password,
      }),
    });
  };
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <>
      <WhiteBox>
        <FormStyled.FormGroup>
          <FormStyled.Label>帳號：</FormStyled.Label>
          <FormStyled.RightBox>
            <TextField name="account" onChange={handleValueChange} />
          </FormStyled.RightBox>
        </FormStyled.FormGroup>
        <FormStyled.FormGroup>
          <FormStyled.Label>密碼：</FormStyled.Label>
          <FormStyled.RightBox>
            <TextField name="password" onChange={handleValueChange} />
          </FormStyled.RightBox>
        </FormStyled.FormGroup>
        <FormStyled.ButtonArea center>
          <Button onClick={handleLogin}>登入</Button>
        </FormStyled.ButtonArea>
      </WhiteBox>
    </>
  );
};
