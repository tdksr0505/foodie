import styled from 'styled-components';
import { TOption } from '@/type';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const StyledAutocomplete = styled(Autocomplete)`
  width: 100%;
  fieldset {
    border-color: #514e4e !important;
    border-width: 1px !important;
  }
  span {
    font-size: 15px;
  }
`;

interface ISelectProps {
  options: Array<TOption>;
  value: Array<TOption>;
  name: string;
  handleChange: (e: React.SyntheticEvent, value: unknown) => void;
}
export default ({ name, ...props }: ISelectProps) => {
  return (
    <StyledAutocomplete
      multiple
      options={props.options}
      value={props.value}
      renderOption={(props, option: any) => {
        return (
          <li {...props} key={option.value} data-name={name}>
            {option.label}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} />}
      onChange={props.handleChange}
    />
  );
};
