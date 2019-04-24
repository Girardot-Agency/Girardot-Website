/**
 * =Call to action (button/link)
************************************************************/

import Link from "next/link";
import styled, {css} from "styled-components";

import {_baseUnit, _center, _flex, _screen, _transition} from "../../assets/styles/mixins/_style";
import {COL, TYPE} from "../../assets/styles/theme/_style";

import exportMap from "../../static/db/export-map.json";

/**
 * =Styles
******************************/

const CTA_Styled = styled.div`
  ${_transition()};

  border: ${_baseUnit(.125)} solid ${COL.brand_main_base};
  color: ${COL.brand_main_base};
  font-size: ${TYPE.scale.sm};
  position: relative;
  width: ${_baseUnit(15)};
    max-width: 100%;
    height: ${_baseUnit(3.25)};

  .CTA-inner,
  .CTA-text {
    height: 100%;
  }

  .CTA-inner {
    display: block;
    padding: 0 ${_baseUnit(3)};
    width: 100%;
  }

  .CTA-text {
    ${_flex("rowCenterAll")};
  }

  &.CTA--center {
    margin: 0 auto;
  }

  &.CTA--shrink {
    width: unset
  }

  &.CTA--secondary {
    background-color: ${COL.grey_lightest};
  }

  &:hover {
    background-color: ${COL.brand_main_base};
    color: ${COL.white};
  }
`;

/**
 * =Component
******************************/

export default function (props = {}) {
  let defaultOptions = {
    align: "left", // [String]
    href: false, // [String]
    style: "primary", // [String]
    text: "Click here", // [String]
    type: "text" // [String] "text" | "link"
  }

  let {
    options
  } = props;

  options = Object.assign({}, defaultOptions, options);

  let pageData, route;
  if (options.href) {
    pageData = exportMap[options.href];
    route = {
      pathname: pageData.page,
      query: pageData.query
    };
  }

  return (
    <CTA_Styled
      className={`
      CTA--${options.style}
      CTA--${options.align}
      ${options.shrink && "CTA--shrink"}
      `}
      shrink={options.shrink}
    >
      {
        options.type === "link" && options.href

        ? (
          <Link
            href={route}
            as={route.query.path}
            scroll={false}
          >
            <a className="CTA-inner">
              <span className="CTA-text">
                {options.text}
              </span>
            </a>
          </Link>
        )

        : (
          <div className="CTA-inner">
            <span className="CTA-text">
              {options.text}
            </span>
          </div>
        )
      }
    </CTA_Styled>
  );
}
