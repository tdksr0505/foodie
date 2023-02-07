import React from 'react';
import styled from 'styled-components';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TOption } from '@/type';

interface IRadiosProps {
  radiosConfig: Array<TOption>;
  defaultValue: number | string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

export default (props: IRadiosProps) => {
  return (
    <RadioGroup row name={props.name} onChange={props.handleChange} defaultValue={props.defaultValue}>
      {props.radiosConfig &&
        props.radiosConfig.map((radio) => (
          <FormControlLabel key={radio.value} value={radio.value} control={<Radio />} label={radio.label} />
        ))}
    </RadioGroup>
  );
};
