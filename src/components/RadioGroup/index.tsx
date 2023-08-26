import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TOption } from '@/type';

interface IRadiosProps {
  radiosConfig: TOption[];
  value: any;
  name: string;
  disabled?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

const MyRadioGroup = (props: IRadiosProps) => {
  return (
    <RadioGroup row name={props.name} onChange={props.handleChange} value={props.value}>
      {props.radiosConfig &&
        props.radiosConfig.map((radio) => (
          <FormControlLabel
            key={radio.label}
            value={radio.value}
            control={<Radio />}
            label={radio.label}
            disabled={props.disabled}
          />
        ))}
    </RadioGroup>
  );
};

export default MyRadioGroup;
