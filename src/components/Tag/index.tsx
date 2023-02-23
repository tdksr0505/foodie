import styled from 'styled-components';

interface ITagProps {
  fontColor?: string;
  bgColor?: string | string[];
}
const DEFAULT_BG = '#947a63';
const DEFAULT_FONT = '#FFF';

export default styled.div<ITagProps>`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 16px;
  background: ${(props) => {
    if (Array.isArray(props.bgColor)) {
      if (props.bgColor.length == 0) return DEFAULT_BG; //array零個值
      else if (props.bgColor.length == 1) return props.bgColor[0]; //array一個值
      else return `linear-gradient(90deg, ${props.bgColor[0]} 50%, ${props.bgColor[1]} 50%)`; //array兩個值以上
    } else {
      //字串
      return props.bgColor || DEFAULT_BG;
    }
  }};
  color: ${(props) => props.fontColor || DEFAULT_FONT};
  & + & {
    margin-left: 10px;
  }
`;
