import styled from 'styled-components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TOption } from '@/type';

const StyledSelect = styled(Select)`
  width: 100%;
  height: 35px;
  fieldset {
    border-color: #514e4e !important;
    border-width: 1px !important;
  }
`;

interface ISelectProps {
  options: TOption[];
  value: number | string;
  name: string;
  handleChange: (e: SelectChangeEvent<unknown>) => void;
}
const MySelect = ({ name, ...props }: ISelectProps) => {
  return (
    <StyledSelect name={name} value={props.value} onChange={props.handleChange}>
      {props.options.map((option: TOption) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default MySelect;
