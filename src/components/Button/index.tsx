import styled from 'styled-components';
import Button from '@mui/material/Button';
export default styled(Button)`
  border: 0;
  outline: none;
  width: auto;
  height: 35px;
  padding: 2px 10px;
  background-color: #dda52e;
  color: #fff;
  font-size: 15px;
  text-transform: none !important;
  @media (hover: hover) {
    &:hover {
      background-color: #dda52e;
    }
  }
`;
