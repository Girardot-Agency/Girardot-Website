/**
 * =Flexbox (mixin)
************************************************************/

import styled, {css} from "styled-components";

export default function (value) {
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
  }

  if (isColumn || isColumnCenterAll) {
    flexFlow = css`flex-flow: column;`;
  }

  if (isRow || isRowCenterAll) {
    flexFlow = css`flex-flow: row wrap;`;
  }

  if (isRowNoWrap) {
    flexFlow = css`flex-flow: row nowrap;`;
  }

  if (isColumnCenterAll || isJustifyContentCenter || isRowCenterAll) {
    justifyContent = css`justify-content: center;`;
  }

  return css`
    ${alignItems};
    ${flexFlow};
    ${justifyContent};

    display: flex;
  `;
}
