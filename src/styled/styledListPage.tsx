import styled from 'styled-components';
import Button from '@/components/Button';

export const PageButtonArea = styled.div`
  margin-bottom: 10px;
  text-align: right;
  ${Button} + ${Button} {
    margin-left: 10px;
  }
`;
export const FilterBox = styled.div`
  z-index: 5;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  @media screen and (min-width: 992px) {
    z-index: auto;
    display: block;
    position: static;
    flex: 0 0 auto;
    width: 300px;
    height: auto;
  }
`;
export const ListBox = styled.div`
  flex: 1 1 auto;
  @media screen and (min-width: 992px) {
    padding-left: 20px;
  }
`;
export const RestaurantListPageBox = styled.div`
  display: flex;
`;
