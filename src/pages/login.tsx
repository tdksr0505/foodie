import { useState } from 'react';
import TextField from '@/components/TextField';
import WhiteBox from '@/components/WhiteBox';
import * as Form from '@/styles/styledFormPage';
import Button from '@/components/Button';
import useSnackbar from '@/hooks/useSnackbar';
import useLoading from '@/hooks/useLoading';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

interface IFormValue {
  account: string;
  password: string;
}
const initFormValue = {
  account: '',
  password: '',
};
const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();
  const [formValue, setFormValue] = useState<IFormValue>(initFormValue);
  const handleLogin = async () => {
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account: formValue.account, password: formValue.password }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.code === 0) {
          login({ account: result.data.account, token: result.data.token, name: result.data.name });
          router.push(`/`);
        } else {
          setFormValue({
            ...formValue,
            password: '',
          });
        }
        setLoading(false);
        showSnackbar(result.data.msg);
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
        <Form.FormTitle>登入</Form.FormTitle>
        <Form.FormGroup>
          <Form.Label>帳號：</Form.Label>
          <Form.RightBox>
            <TextField name="account" value={formValue.account} onChange={handleValueChange} />
          </Form.RightBox>
        </Form.FormGroup>
        <Form.FormGroup>
          <Form.Label>密碼：</Form.Label>
          <Form.RightBox>
            <TextField type="password" name="password" value={formValue.password} onChange={handleValueChange} />
          </Form.RightBox>
        </Form.FormGroup>
        <Form.ButtonArea center>
          <Button onClick={handleLogin}>送出</Button>
        </Form.ButtonArea>
      </WhiteBox>
    </>
  );
};

export default LoginPage;
