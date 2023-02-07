import React from 'react';
import styled from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export interface ITab {
  value: number | string;
  label: string;
}
interface ITabs {
  tabsConfig: Array<ITab>;
  value: number | string;
  handleChange: (event: React.SyntheticEvent, value: number) => void;
}

export default (props: ITabs) => {
  return (
    <div>
      <Tabs value={props.value} onChange={props.handleChange}>
        {props.tabsConfig && props.tabsConfig.map((tab) => <Tab value={tab.value} label={tab.label} />)}
      </Tabs>
    </div>
  );
};
