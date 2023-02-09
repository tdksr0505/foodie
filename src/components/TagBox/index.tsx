import React from 'react';
import styled from 'styled-components';
import Tag from '../Tag';

export default styled.div`
  display: flex;
  ${Tag}+${Tag} {
    margin-left: 10px;
  }
`;
