import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import TextField from '@/components/TextField';
import WhiteBox from '@/components/WhiteBox';
import * as Form from '@/styles/styledFormPage';
import Button from '@/components/Button';
import useSnackbar from '@/hooks/useSnackbar';
import useLoading from '@/hooks/useLoading';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';

interface IFormValue {
  account: string;
  password: string;
}
const initFormValue = {
  account: '',
  password: '',
};
const LoginPage = () => {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();
  const [formValue, setFormValue] = useState<IFormValue>(initFormValue);
  const handleLogin = async () => {
    if (!formValue.account || !formValue.password) {
      showSnackbar('請輸入帳號密碼');
      return;
    }
    setLoading(true);
    const result = await signIn('credentials', {
      account: formValue.account,
      password: formValue.password,
      redirect: false,
    });
    if (result?.ok) {
      router.push(`/`);
    } else {
      result?.error && showSnackbar(result.error);
      setFormValue({
        ...formValue,
        password: '',
      });
    }
    setLoading(false);
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
}
