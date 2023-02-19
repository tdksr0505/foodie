import React from 'react';
import styled from 'styled-components';
const StyledInput = styled.input`
  outline: none;
  border: 1px solid #514e4e;
  border-radius: 4px;
  width: 100%;
  height: 35px;
  padding: 2px 10px;
  font-size: 16px;
`;

const TextField = (props: any) => {
  return <StyledInput {...props} autoComplete="off" />;
};

export default TextField;
