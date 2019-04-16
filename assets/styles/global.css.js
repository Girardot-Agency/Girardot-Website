import {createGlobalStyle} from "styled-components";

import {BASE, FONT, TRAN, COL} from "./theme.css";

export default createGlobalStyle`

  @font-face {
    font-family: "apercu";
    src: url("/static/fonts/apercu.ttf") format("truetype");
  }

  @font-face {
    font-family: "apercu-bold";
    src: url("/static/fonts/apercu-bold.ttf") format("truetype");
  }

  html {
    font-family: "apercu", sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: ${TRAN.all};
  }
`;
