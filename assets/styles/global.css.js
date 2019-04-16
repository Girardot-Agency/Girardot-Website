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

  /* Modal: needs global style */
  /* .Modal-inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    background-color: papayawhip;
  }

  .Modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .3333);
  } */

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
