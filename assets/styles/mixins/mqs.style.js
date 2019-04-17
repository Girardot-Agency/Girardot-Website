/**
 * =Media queries (mixins)
************************************************************/

import styled, {css} from "styled-components";

import {SCREEN} from "../theme/_style";

export default function (mqs = {}) {
  let {sm, md, lg, xl} = mqs;

  if (sm) {
    sm = css`
      @media ${SCREEN.sm} {
        ${sm}
    }`;
  } if (md) {
    md = css`
      @media ${SCREEN.md} {
        ${md}
    }`;
  } if (lg) {
    lg = css`
      @media ${SCREEN.lg} {
        ${lg}
    }`;
  } if (xl) {
    xl = css`
      @media ${SCREEN.xl} {
        ${xl}
    }`;
  }

  return css`
    ${sm};
    ${md};
    ${lg};
    ${xl};
  `;
}
