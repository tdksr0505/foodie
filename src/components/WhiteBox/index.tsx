import React from 'react';
import styled from 'styled-components';

interface ITagProps {
  fontColor?: string;
  bgColor?: string;
}
const DEFAULT_BG = '#ab8a46';
const DEFAULT_FONT = '#FFF';

export default styled.div`
  background-color: #fff;
  max-width: 800px;
  width: 100%;
  margin: auto;
  padding: 30px;
  border-radius: 10px;
`;
