import Link from "next/link";
import styled, {css} from "styled-components";

import Logo from "./logo";

import {
  $_BaseUnit,
  $_Screen,
  $_Flex
} from "../assets/styles/mixins.css";

import {
  COL,
  BASE,
  TYPE
} from "../assets/styles/theme.css";

/**
 * =Card
************************************************************/

/**
 * =Card:styles
******************************/

const Footer_SC = styled.footer`
  background-color: ${COL.grey_lightest};

  height: ${$_BaseUnit(10)};
  /* margin-top: ${$_BaseUnit(5)}; */

  ${$_Screen({
    md: css`height: ${$_BaseUnit(15)};`
  })};
`;

const FooterInner_SC = styled.div`
  ${$_Flex("columnCenterAll")};

  height: 100%;

  & p {
    color: ${COL.grey_darkest};
    font-size: ${TYPE.scale.xs};
    margin-top: ${$_BaseUnit()};
  }
`;

/**
 * =Card:component
******************************/

function Footer ({props}) {
  return (
    <Footer_SC>
      <FooterInner_SC>
        <Link
          passHref
          href={"/"}
          prefetch
        >
          <a><Logo size="md" logo="logoMain" /></a>
        </Link>
        <p>C Girardot {new Date().getFullYear()}. All rights reserved</p>
      </FooterInner_SC>
    </Footer_SC>
  );
}

export default Footer;
