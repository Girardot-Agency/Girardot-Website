/**
 * =Call to action (button/link)
************************************************************/

import Link from "next/link";
import styled from "styled-components";

import {_baseUnit, _center, _screen, _transition} from "../../assets/styles/mixins/_style";
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
  margin: 0 auto;
  position: relative;
  width: ${_baseUnit(15)};
    max-width: 100%;
    height: ${_baseUnit(3.25)};

  &:hover {
    background: ${COL.brand_main_base};
    color: ${COL.white};
  }

  .CTA-inner {
    display: block;
    width: 100%;
      height: 100%;
  }

  .CTA-text {
    ${_center("xy")};
  }
`;

/**
 * =Component
******************************/

export default function (props = {}) {
  const defaultOpts = {
    type: "text", // [String] "text" | "link"
    text: "Click here", // [String]
    href: false // [String]
  }

  const {
    options = defaultOpts
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
    <CTA_Styled>
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
