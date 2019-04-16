import styled, {css} from "styled-components";

import Div100vh from "react-div-100vh";
import Logo from "./logo";

import {
  COL,
  STRAP,
  TYPE
} from "../assets/styles/theme.css";

import {
  $_BaseUnit,
  $_Screen,
  $_ContentWrapper,
  $_PosCenter,
  $_triangle,
  $_Flex
} from "../assets/styles/mixins.css";

/**
 * =Hero
************************************************************/

/**
 * =Hero (styles)
******************************/

const Hero_SC = styled(Div100vh)`
  background-color: ${COL.brand_main_base};
  background-image: radial-gradient(
    ${COL.brand_main_light},
    ${COL.brand_main_darkest}
  );
  position: relative;
  width: 100%;
    height: 100vh;

  /* background-image: url(${props => props.bgImg}); */
`;

const HeroBrand_SC = styled.header`
  ${$_ContentWrapper};

  ${$_Flex("columnCenterAll")};
  ${$_PosCenter("xy")};
`;

const HeroStrap_SC = styled.p`
  color: ${COL.white};
  font-size: ${TYPE.scale.md};
  margin-top: ${$_BaseUnit(1.5)};
  text-align: center;
`;

const HeroScroll_SC = styled.div`
  ${$_PosCenter("x")};
  ${$_triangle($_BaseUnit(), COL.white)};

  bottom: 5%;

  &::before {
    ${$_PosCenter("x")};

    content: "Scroll";
    color: ${COL.white};
    display: block;
    font-size: ${TYPE.scale.sm};
    top: -${$_BaseUnit(4)};
  }
`;

/**
 * =Hero (component)
******************************/

function Hero (props = {}) {
  const {image, strap} = props;

  return (
    <Hero_SC>
      <HeroBrand_SC>
        <Logo logo="logoInvert" size="lg" imgSrc={image} />
        <HeroStrap_SC>{strap}</HeroStrap_SC>
      </HeroBrand_SC>
      <HeroScroll_SC />
    </Hero_SC>
  );
}

export default Hero;
