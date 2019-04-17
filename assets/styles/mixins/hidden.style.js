/**
 * =Hidden (mixin)
************************************************************/

import styled, {css} from "styled-components";

export default function () {
  return css`
    clip: rect(1px, 1px, 1px, 1px);
    position: absolute !important;
  `;
}
