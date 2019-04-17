/**
 * =Call to action (button/link)
************************************************************/

import Link from "next/link";
import styled from "styled-components";

import {_screen} from "../../assets/styles/mixins/_style";

import {
  $_BaseUnit,
  $_PosCenter,
  $_TransAll
} from "../../assets/styles/mixins.css";
import {
  COL,
  TYPE
} from "../../assets/styles/theme.css";

import exportMap from "../../static/db/export-map.json";

/**
 * =Styles
******************************/

const CTA_Styled = styled.div`
  ${$_TransAll};

  border: ${$_BaseUnit(.125)} solid ${COL.brand_main_base};
  color: ${COL.brand_main_base};
  font-size: ${TYPE.scale.sm};
  margin: 0 auto;
  position: relative;
  width: ${$_BaseUnit(15)};
    max-width: 100%;
    height: ${$_BaseUnit(3.25)};

  &:hover {
    background-color: ${COL.brand_main_base};
    color: ${COL.white};
  }

  .CTA-inner {
    display: block;
    width: 100%;
      height: 100%;
  }

  .CTA-text {
    ${$_PosCenter("xy")};
  }
`;

/**
 * =Component
******************************/

export default function (props = {}) {
  const defaultOpts = {
    type: "text",
    text: "Click here",
    pageURL: false
  }

  const {
    options = defaultOpts
  } = props;

  let pageData, route;
  if (options.pageURL) {
    pageData = exportMap[pageUrl];
    route = {
      pathname: pageData.page,
      query: pageData.query
    };
  }

  return (
    <CTA_Styled>
      {
        options.type === "link" && options.pageURL
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
