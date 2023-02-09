import styled from 'styled-components';
import TextField from '@/components/TextField';
import BaseSearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
interface IFilterProps {
  isOpen: boolean;
}
export const Filter = styled.div<IFilterProps>`
  position: absolute;
  top: ${(props) => (props.isOpen ? '0%' : '100%')};
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  background-color: #fff;
  transition: top 0.2s;
  @media screen and (min-width: 992px) {
    position: static;
    height: auto;
  }
`;

export const InputBox = styled.div`
  position: relative;
`;
export const SearchInput = styled(TextField)`
  border-color: #b8b6b6;
  color: #494848;
  padding-left: 40px;
`;

export const SearchIcon = styled(BaseSearchIcon)`
  color: #a09e9e;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
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
  background-color: #e4bc46;
  text-align: center;
  padding-top: 8px;
  @media screen and (min-width: 992px) {
    display: none;
  }
`;

export const CloseBtnBox = styled.div`
  text-align: right;
  margin-bottom: 10px;
  @media screen and (min-width: 992px) {
    display: none;
  }
`;
export const CloseBtn = styled(CloseIcon)`
  color: #e4bc46;
  font-size: 50px;
`;
