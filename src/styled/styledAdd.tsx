import styled from 'styled-components';

export const ButtonArea = styled.div`
  margin-top: 20px;
  text-align: right;
`;

export const Label = styled.div`
  color: #646b73;
  width: 80px;
  text-align: right;
`;

export const RightBox = styled.div`
  flex: 1 0 auto;
  margin-left: 10px;
`;

export const FormGroup = styled.div`
  display: flex;
  align-items: center;
  & + & {
    margin-top: 20px;
  }
`;

export const FormBox = styled.div`
  background-color: #fff;
  max-width: 500px;
  margin: auto;
  padding: 30px;
  border-radius: 10px;
`;
