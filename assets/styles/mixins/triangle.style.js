/**
 * =Triangle
************************************************************/

import styled, {css} from "styled-components";

export default function (width, col) {
  return css`
    border-style: solid;
    border-width: ${width} ${width} 0 ${width};
    border-color: ${col} transparent transparent transparent;
    height: 0;
    width: 0;
  `;
}
