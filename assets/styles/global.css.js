import { createGlobalStyle } from "styled-components";

import { TYPE } from "./theme/_style";
import { _transition } from "./mixins/_style";

export default createGlobalStyle`

  @font-face {
    font-family: "apercu";
	font-weight: normal;
    src: url("/static/fonts/apercu.ttf") format("truetype");
  }

  @font-face {
    font-family: "apercu-bold";
	font-weight: normal;
    src: url("/static/fonts/apercu-bold.ttf") format("truetype");
  }

  html {
    font-family: ${TYPE.ff.main};
    font-size: ${TYPE.scale.sm};
  }

  body {
	  overflow-x: hidden;
  }

  a {
    ${_transition()};

    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${TYPE.ff.main};
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
