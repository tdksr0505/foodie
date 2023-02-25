import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DEFAULT_COLOR = '#aaaaaa';
const ACTIVE_COLOR = '#f0a4c6';

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
  @media (hover: hover) {
    &:hover {
      border-color: ${ACTIVE_COLOR};
      color: ${ACTIVE_COLOR};
    }
  }
`;

interface IToggleTagProps {
  label: string;
  value?: boolean;
  onClick?: (e: React.SyntheticEvent, value: boolean) => void;
  [x: string]: unknown;
}
const ToggleTag = ({ label, value, onClick, ...restProps }: IToggleTagProps) => {
  const [toggle, setToggle] = useState<boolean>(value || false);
  const [clickEvent, setClickEvent] = useState<React.SyntheticEvent | null>(null);
  const onClickTag = (e: React.SyntheticEvent) => {
    setToggle((toggle) => !toggle);
    setClickEvent(e);
  };
  useEffect(() => {
    if (onClick && clickEvent) onClick(clickEvent, toggle);
  }, [clickEvent]);
  useEffect(() => {
    if (value !== undefined) setToggle(value);
  }, [value]);
  return (
    <StyledToggleTag active={toggle} onClick={onClickTag} {...restProps}>
      {label}
    </StyledToggleTag>
  );
};

export default ToggleTag;
