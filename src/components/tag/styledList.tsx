import styled from 'styled-components';

type TTagProps = {
  fontColor?: string;
  bgColor?: string;
};
export const Tag = styled.div<TTagProps>`
  padding: 2px 6px;
  border-radius: 5px;
  font-size: 16px;
  background-color: ${(props) => (props.bgColor ? props.bgColor : '#ab8a46')};
  color: ${(props) => (props.fontColor ? props.fontColor : '#fff')};
`;
