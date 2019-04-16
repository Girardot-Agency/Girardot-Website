import styled, {css} from "styled-components";

import {
  COL,
  BASE,
  SCREEN,
  SIZE
} from "./theme.css";

/**
 * =Units
************************************************************/

export function $_BaseUnit (x) {
  if (x) return `${BASE.unit * x}px`;
  return `${BASE.unit}px`;
}

/**
 * =Media queries
************************************************************/

export function $_Screen (mqs = {}) {
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

/**
 * =Borders and shadow
************************************************************/

// =Shadow
export const $_Shadow = css`
  box-shadow: 0 10px 6px rgba(0, 0, 0, .26);
`;

/**
 * =Flex
************************************************************/

export function $_Flex (value) {
  const isAlignItemsCenter = value === "alignItemsCenter",
        isColumn = value === "column",
        isColumnCenterAll = value === "columnCenterAll",
        isRowCenterAll = value === "rowCenterAll",
        isRow = value === "row",
        isRowNoWrap = value === "rowNoWrap",
        isJustifyContentCenter = value === "justifyContentCenter";

  let alignItems, flexFlow, justifyContent;

  if (isAlignItemsCenter || isColumnCenterAll || isRowCenterAll) {
    alignItems = css`align-items: center;`;

  } if (isColumn || isColumnCenterAll) {
    flexFlow = css`flex-flow: column;`;

  } if (isRow || isRowCenterAll) {
    flexFlow = css`flex-flow: row wrap;`;

  } if (isRowNoWrap) {
    flexFlow = css`flex-flow: row nowrap;`;

  } if (isColumnCenterAll || isJustifyContentCenter || isRowCenterAll) {
    justifyContent = css`justify-content: center;`;
  }

  return css`
    ${alignItems};
    ${flexFlow};
    ${justifyContent};

    display: flex;
  `;
}

/**
 * =Link
************************************************************/

export function $_Link (col, hoverCol) {
  return css`
    color: ${col};
    &:hover { color: ${hoverCol}; };
  `;
}

/**
 * =Positioning
************************************************************/

// =Position center X
export function $_PosCenter (center, pos = "absolute") {
  const isX = center === "x",
        isY = center === "y",
        isXY = center === "xy";

  let transform, left = "", top = "";

  if (isX) transform = css`transform: translateX(-50%);`
  else if (isY) transform = css`transform: translateY(-50%);`
  else transform = css`transform: translate(-50%, -50%);`

  if (isX || isXY) left = css`left: 50%;`
  if (isY || isXY) top = css`top: 50%;`

  return css`
    ${transform};
    ${left};
    ${top};

    position: ${pos};
  `;
}

/**
 * =Transitions
************************************************************/

// =Transition
export const $_TransAll = css`
  transition: ease-in-out all .2s;
`;

/**
 * =Triangle
************************************************************/

export function $_triangle (width, col) {
  return css`
    border-style: solid;
    border-width: ${width} ${width} 0 ${width};
    border-color: ${col} transparent transparent transparent;
    height: 0;
    width: 0;
  `;
}

/**
 * =Wrappers
************************************************************/

// =Content wrapper
export const $_ContentWrapper = css`
  margin-left: auto;
  margin-right: auto;
  padding-left: ${BASE.unit}px;
  padding-right: ${BASE.unit}px;
  width: 100%;
    max-width: 100%;

  @media ${SCREEN.md} {
    width: 88.75%;
  }
`;

/**
 * =Misc.
************************************************************/

// =Hidden
export const $_Hidden = css`
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute !important;
`;

// =Pseudo absolute
export const $_PseudoBase = css`
  content: "";
  display: block;
`;

