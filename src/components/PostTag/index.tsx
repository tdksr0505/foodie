import React from 'react';
import styled from 'styled-components';

interface ITagProps {
  fontColor?: string;
  bgColor?: string;
}
const DEFAULT_BG = '#eea052';
const DEFAULT_FONT = '#FFF';

export default styled.div<ITagProps>`
  display: inline-block;
  height: 32px;
  line-height: 32px;
  position: relative;
  padding: 0 10px 0 12px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : DEFAULT_BG)};
  color: ${(props) => (props.fontColor ? props.fontColor : DEFAULT_FONT)};
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -15px;
    width: 0;
    height: 0;
    border-color: transparent ${(props) => (props.bgColor ? props.bgColor : DEFAULT_BG)} transparent transparent;
    border-style: solid;
    border-width: 16px 16px 16px 0;
  }
  &:after {
    content: '';
    position: absolute;
    top: 14px;
    left: 3px;
    float: left;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #fff;
    box-shadow: -1px -1px 2px rgba(0, 0, 0, 0.4);
  }
`;
