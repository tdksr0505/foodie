import styled from 'styled-components';
export default styled.button`
  width: auto;
  height: 35px;
  padding: 2px 18px;
  background-color: #f7bed8;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  border: 0;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      background-color: #f097bf;
    }
  }
`;
