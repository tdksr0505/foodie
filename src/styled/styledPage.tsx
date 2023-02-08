import styled from 'styled-components';
import BaseList from '@/components/List';
import BaseFilter from '@/components/Filter';

export const List = styled(BaseList)`
  flex: 1 0 auto;
  padding-left: 20px;
`;
export const Filter = styled(BaseFilter)`
  width: 300px;
`;
export const RestaurantListPageBox = styled.div`
  display: flex;
  ${Filter} {
    width: 300px;
  }
`;
