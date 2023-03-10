import styled from 'styled-components';

export const Logo = styled.img`
  width: 160px;
  margin-top: 8px;

  @media screen and (min-width: 992px) {
    width: 240px;
  }
`;

export const Account = styled.div`
  margin-right: 15px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const RightBox = styled.div`
  display: flex;
  align-items: center;
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
  background-color: #947a63;
  box-shadow: 0 2px 5px rgb(0 0 0 / 15%);
  @media screen and (min-width: 992px) {
    padding: 0 30px;
    height: 70px;
  }
`;
