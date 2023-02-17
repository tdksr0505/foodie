import styled from 'styled-components';
import { PageButtonArea } from '@/styles/styledListPage';
import Button from '@/components/Button';

export const BackButton = styled(Button)`
  margin-right: 10px;
`;

export const ButtonArea = styled(PageButtonArea)`
  margin: 20px 0 0 0;
`;

export const Label = styled.div`
  color: #646b73;
  width: 80px;
  @media screen and (min-width: 992px) {
    text-align: right;
  }
`;

export const RightBox = styled.div`
  margin-top: 5px;

  @media screen and (min-width: 992px) {
    flex: 1 0 auto;
    margin-top: 0px;
    margin-left: 10px;
  }
`;

export const FormGroup = styled.div`
  align-items: center;
  & + & {
    margin-top: 10px;
  }
  @media screen and (min-width: 992px) {
    display: flex;
    & + & {
      margin-top: 20px;
    }
  }
`;

export const PageTitle = styled.div`
  color: #d6b657;
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: bold;
`;
