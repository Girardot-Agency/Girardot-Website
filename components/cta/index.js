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
  padding: 0 ${_baseUnit(3)};
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
    width: 100%;
  }

  .CTA-text {
    ${_flex("rowCenterAll")};
  }

  &.CTA--secondary {
    background-color: ${COL.grey_lightest};
  }

  &:hover {
    background-color: ${COL.brand_main_base};
    color: ${COL.white};
  }

  ${props => props.shrink
    ? `${css`width: unset`}`
    : ""
  };
`;

/**
 * =Component
******************************/

export default function (props = {}) {
  let defaultOptions = {
    align: false, // [String]
    href: false, // [String]
    style: "primary", // [String]
    text: "Click here", // [String]
    type: "text" // [String] "text" | "link"
  }

  let {
    options = defaultOptions
  } = props;

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
      className={`CTA--${options.style}`}
      align={options.align}
      shrink={options.shrink}
    >
      {
        options.type === "link" && options.href

        ? (
          <Link
            href={route}
            as={route.query.path}
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
