import styled from 'styled-components';

interface IButtonAraeaProps {
  center?: boolean;
}
export const ButtonArea = styled.div<IButtonAraeaProps>`
  text-align: ${(props) => (props.center ? 'center' : 'right')};
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

export const FormTitle = styled.div`
  color: #947a63;
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: bold;
`;
