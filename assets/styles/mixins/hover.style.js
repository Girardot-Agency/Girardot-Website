/**
 * =Hover (mixin)
************************************************************/

import styled, {css} from "styled-components";

export default function (col, hoverCol) {
  return css`
    color: ${col};
    &:hover { color: ${hoverCol}; };
  `;
}
