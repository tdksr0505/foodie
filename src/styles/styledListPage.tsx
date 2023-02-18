import styled from 'styled-components';
import Button from '@/components/Button';
import FilterListIcon from '@mui/icons-material/FilterList';

export const PageButtonArea = styled.div`
  margin-bottom: 20px;
  text-align: right;
  ${Button} + ${Button} {
    margin-left: 10px;
  }
`;

export const FilterIcon = styled(FilterListIcon)`
  color: #ffffff;
  font-size: 35px;
`;
export const FilterButton = styled.div`
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #82929f;
  text-align: center;
  padding-top: 8px;
  @media screen and (min-width: 992px) {
    display: none;
  }
`;

export const RestaurantListPageBox = styled.div`
  display: flex;
  align-items: flex-start;
`;
