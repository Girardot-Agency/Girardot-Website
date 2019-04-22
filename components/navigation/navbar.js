/**
 * =Navbar
************************************************************/

import Link from "next/link";
import styled from "styled-components";

// Theme/mixins
import {COL} from "../../assets/styles/theme/_style";
import {_baseUnit, _contentWrapper, _flex, _center, _shadow} from "../../assets/styles/mixins/_style";

// External parts
import Button from "../button";
import Logo from "../logo";

/**
 * =Styles
******************************/

const Navbar_Styled = styled.div`
  ${_shadow()};

  background: ${COL.white};
  height: ${_baseUnit(5)};
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 300;

  .Navbar-inner {
    ${_contentWrapper()};
    ${_flex("alignItemsCenter")};

    height: 100%;
  }

  .Navbar-logo {
    ${_center("x")}
  }
`;

/**
 * =Component
******************************/

export default function (props = {}) {
  const {
    handleClick,
    activeClass
  } = props;

  return (
    <Navbar_Styled>
      <div className="Navbar-inner">

        <Button
          handleClick={handleClick}
          activeClass={activeClass}
          options={{type: "hmbgr"}} />

        <div className="Navbar-logo">
          <Link
            passHref
            href={"/"}
            prefetch
          >
            <a>
              <Logo size="sm" logo="logoMain" />
            </a>
          </Link>
        </div>

      </div>
    </Navbar_Styled>
  );
}
