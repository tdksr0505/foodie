import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`

*{
  box-sizing: border-box;
  font-family: "Microsoft JhengHei"
}
body {
  margin: 0;
  /* background-image: linear-gradient(135deg, #fdfcfb 0%, #cdaf96 100%);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100%;
  background-attachment: fixed; */
  a{
    text-decoration: none;
  }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
`;

export default GlobalStyles;
