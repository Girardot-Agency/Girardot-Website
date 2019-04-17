/**
 * =Center (mixin)
************************************************************/

import styled, {css} from "styled-components";

export default function (center, pos = "absolute") {
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


