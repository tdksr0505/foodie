import React, { useState } from 'react';
import styled from 'styled-components';

const DEFAULT_COLOR = '#aaaaaa';
const ACTIVE_COLOR = '#0e94d3';

interface IStyledToggleTagProps {
  active: boolean;
}
const StyledToggleTag = styled.div<IStyledToggleTagProps>`
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 6px;
  padding: 4px 10px;
  font-size: 16px;
  color: ${(props) => (props.active ? ACTIVE_COLOR : DEFAULT_COLOR)};
  border: 1px solid ${DEFAULT_COLOR};
  border-radius: 30px;
  border-color: ${(props) => (props.active ? ACTIVE_COLOR : DEFAULT_COLOR)};

  cursor: pointer;
  &:hover {
    border-color: ${ACTIVE_COLOR};
    color: ${ACTIVE_COLOR};
  }
`;

interface IToggleTagProps {
  label: string;
  defaultValue?: boolean;
  onToggle?: (e: React.SyntheticEvent, value: boolean) => void;
  [x: string]: unknown;
}
export default ({
  label,
  defaultValue = false,
  onToggle = (e: React.SyntheticEvent, value: boolean) => {},
  ...restProps
}: IToggleTagProps) => {
  const [toggle, setToggle] = useState<boolean>(defaultValue);
  const onClickTag = (e: React.SyntheticEvent) => {
    onToggle(e, !toggle);
    setToggle((state) => !state);
  };
  return (
    <StyledToggleTag active={toggle} onClick={onClickTag} {...restProps}>
      {label}
    </StyledToggleTag>
  );
};
