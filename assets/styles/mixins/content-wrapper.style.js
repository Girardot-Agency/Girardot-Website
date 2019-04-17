/**
 * =Content wrapper (mixin)
************************************************************/

import styled, {css} from "styled-components";

import {_baseUnit, _screen} from "./_style";

export default function () {
  return css`
    margin-left: auto;
    margin-right: auto;
    padding-left: ${_baseUnit()};
    padding-right: ${_baseUnit()};
    width: 100%;
      max-width: 100%;

    ${_screen({ md: css`width: 88.75%;` })}
  `;
}
