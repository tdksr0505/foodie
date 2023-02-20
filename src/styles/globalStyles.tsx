import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`

*{
  box-sizing: border-box;
  font-family: "Microsoft JhengHei"
}
body {
  margin: 0;
  background-color: #000;
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
