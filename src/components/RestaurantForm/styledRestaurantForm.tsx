import styled from 'styled-components';

export const ButtonArea = styled.div`
  margin-top: 20px;
  text-align: right;
`;

export const Label = styled.div`
  color: #646b73;
  width: 80px;
  @media (min-width: 768px) {
    text-align: right;
  }
`;

export const RightBox = styled.div`
  margin-top: 5px;

  @media (min-width: 768px) {
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
  @media (min-width: 768px) {
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
