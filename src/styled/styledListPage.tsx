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
  display: none;
  flex: 0 0 auto;
  width: 300px;
  @media (min-width: 992px) {
    display: block;
  }
`;
export const ListBox = styled.div`
  flex: 1 1 auto;
  @media (min-width: 992px) {
    padding-left: 20px;
  }
`;
export const RestaurantListPageBox = styled.div`
  display: flex;
`;
