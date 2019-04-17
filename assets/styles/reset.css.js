import {createGlobalStyle} from "styled-components";

import {BASE, FONT, TRAN, COL} from "./theme.css";

/**
 * =Base reset
 * See: https://github.com/zellwk/css-reset/blob/master/reset.css */
export default createGlobalStyle`

  /* Set box-sizing to border-box for all elements */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Reset margins and paddings on most elements */
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  ol,
  li,
  p,
  pre,
  blockquote,
  figure,
  hr {
    margin: 0;
    padding: 0;
  }

  /* Removes discs from ul */
  ul {
    list-style: none;
  }

  /* Reset forms and buttons */
  input,
  textarea,
  select,
  button {
    font: inherit;
    letter-spacing: inherit;
  }

  input,
  textarea,
  button {
    border: 1px solid gray;
  }

  /* Easy responsive for media elements */
  embed,
  iframe,
  img,
  object,
  video {
    display: block;
    /* max-width: 100%; */
  }

  /* Useful table styles */
  table {
    table-layout: fixed;
    width: 100%;
  }

  /* Hidden */
  [hidden] {
    display: none !important;
  }

  /* noscript styles */
  noscript {
    display: block;
    margin-bottom: 1em;
    margin-top: 1em;
  }
`;
