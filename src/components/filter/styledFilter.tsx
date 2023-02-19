import styled from 'styled-components';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import BaseSearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
interface IFilterProps {
  isOpen: boolean;
}

interface IMrtLineNameProps {
  color?: string;
}

export const Filter = styled.div<IFilterProps>`
  display: flex;
  flex-direction: column;
  z-index: 4;
  position: fixed;
  top: ${(props) => (props.isOpen ? '60px' : '100%')}; // open時到header高度
  left: 0;
  height: calc(100% - 60px);
  width: 100%;
  background-color: #ffffff;
  transition: top 0.2s;
  @media screen and (min-width: 992px) {
    position: static;
    flex: 0 0 auto;
    width: 300px;
    height: auto;
  }
`;

export const InputBox = styled.div`
  position: relative;
  margin-bottom: 20px;
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

export const CloseBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  text-align: right;
  height: 52px;
  border-bottom: 2px solid #82929f;
  @media screen and (min-width: 992px) {
    display: none;
  }
`;
export const CloseBtn = styled(CloseIcon)`
  color: #82929f;
  font-size: 38px;
`;

export const FilterOptionTitle = styled.div<{ mt?: boolean }>`
  color: #717171;
  padding-bottom: 5px;
  border-bottom: 1px solid #acabab;
  margin-bottom: 10px;
  margin-top: ${(props) => props.mt && '6px'};
`;

export const MrtLineBox = styled.div`
  & + & {
    margin-top: 10px;
  }
`;

export const MrtLineName = styled.div<IMrtLineNameProps>`
  color: ${(props) => props.color};
`;

export const ToggleTagBox = styled.div`
  margin-bottom: 10px;
`;

export const FilterOptions = styled.div`
  padding: 20px;
  overflow-y: auto;
  @media screen and (min-width: 992px) {
    height: auto;
  }
`;
export const ButtonBox = styled.div`
  width: 100%;
  padding: 20px 20px;
  border-top: 1px solid #82929f;
  background-color: #fff;
  text-align: center;
  height: 70px;
  ${Button}+ ${Button} {
    margin-left: 10px;
  }
  @media screen and (min-width: 992px) {
    height: auto;
    border-top: none;
    padding-top: 0;
  }
`;
export const InnerBox = styled.div``;
