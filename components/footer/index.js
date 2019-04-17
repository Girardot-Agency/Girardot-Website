/**
 * =Footer
************************************************************/

import Link from "next/link";
import styled, {css} from "styled-components";

// Theme/misxins/helpers
import {_baseUnit, _screen, _flex} from "../../assets/styles/mixins/_style";
import {COL, TYPE} from "../../assets/styles/theme/_style";

// External components
import Logo from "../logo";

/**
 * =Styles
******************************/

const Footer_Styled = styled.footer`
  background-color: ${COL.grey_lightest};

  height: ${_baseUnit(10)};

  ${
    _screen({
      md: css`height: ${_baseUnit(15)};`
    })
  };

  .Footer-inner {
    ${_flex("columnCenterAll")};

    height: 100%;

    p {
      color: ${COL.grey_darkest};
      font-size: ${TYPE.scale.xs};
      margin-top: ${_baseUnit()};
    }
  }
`;

/**
 * =Component
******************************/

export default function ({props}) {
  return (
    <Footer_Styled>
      <div className="Footer-inner">

        <Link
          passHref
          href={"/"}
          prefetch
        >
          <a>
            <Logo size="md" logo="logoMain" />
          </a>
        </Link>

        <p>C Girardot {new Date().getFullYear()}. All rights reserved</p>

      </div>
    </Footer_Styled>
  );
}
