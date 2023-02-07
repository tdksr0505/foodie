import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`

*{
  box-sizing: border-box;
  font-family: "Microsoft JhengHei"
}
body {
  margin: 0;
  background-color: #e1e0e0;
  background-image: linear-gradient(135deg, #fdfcfb 0%, #cdaf96 100%);
  /* background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); */
  background-size: 100%;
}
a{
  text-decoration: none;
}
`;

export default GlobalStyles;
