import {createGlobalStyle} from "styled-components";

import {BASE, FONT, TRAN, COL, TYPE} from "./theme.css";

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
    font-size: ${TYPE.scale.sm};
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: ${TRAN.all};
  }

  .ReactModal__Overlay {
    opacity: 0;
    transition: all 400ms ease-in-out;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
`;
