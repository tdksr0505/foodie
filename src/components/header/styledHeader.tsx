import styled from 'styled-components';
import Button from '../../components/Button';

export const Logo = styled.img`
  width: 160px;
  margin-top: 8px;

  @media screen and (min-width: 992px) {
    width: 240px;
  }
`;

export const LoginButotn = styled(Button)`
  background-color: #123786;
  @media (hover: hover) {
    &:hover {
      background-color: #3e5587;
    }
  }
`;

export const Header = styled.header`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  left: 0;
  height: 60px;
  padding: 0 10px;
  background-color: #82929f;
  box-shadow: 0 2px 5px rgb(0 0 0 / 15%);
  @media screen and (min-width: 992px) {
    padding: 0 30px;
    height: 70px;
  }
`;
