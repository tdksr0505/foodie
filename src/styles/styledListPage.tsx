import styled from 'styled-components';
import Button from '@/components/Button';
import TuneIcon from '@mui/icons-material/Tune';
import BaseAddIcon from '@mui/icons-material/Add';
import { fadeInUp } from '@/styles/animation';

export const PageButtonArea = styled.div`
  text-align: right;
  ${Button} + ${Button} {
    margin-left: 10px;
  }
`;

export const AddIcon = styled(BaseAddIcon)`
  color: #ffffff;
`;

export const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  height: 100%;
  ${AddIcon} {
    font-size: 25px;
  }
`;

export const CountBox = styled.div`
  min-width: 110px;
  height: 100%;
  padding: 8px 15px;
  background-color: #fff;
  color: #464646;
  font-weight: bold;
`;

export const ListTopArea = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 15px;
`;

export const FilterIcon = styled(TuneIcon)`
  font-size: 35px !important;
  color: #ffffff;
`;

export const FilterButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f0a4c6;
  text-align: center;
  padding-top: 8px;
  animation: ${fadeInUp} 0.6s linear;
`;

export const FilterButtonBox = styled.div`
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  @media screen and (min-width: 992px) {
    display: none;
  }
`;

export const RestaurantListPageBox = styled.div`
  display: flex;
  align-items: flex-start;
`;
