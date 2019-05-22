/**
 * =Hero
************************************************************/

import Div100vh from "react-div-100vh";
import styled from "styled-components";

// External parts
import Logo from "../logo";

// Mixins/theme/helpers
import {COL, TYPE} from "../../assets/styles/theme/_style";
import {_baseUnit, _contentWrapper, _center, _triangle, _flex} from "../../assets/styles/mixins/_style";

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

  .Hero-brand {
    ${_contentWrapper()};

    ${_flex("columnCenterAll")};
    ${_center("xy")};
  }

  .Hero-strap {
    color: ${COL.white};
    font-size: ${TYPE.scale.md};
    margin-top: ${_baseUnit(1.5)};
    text-align: center;
  }

  .Hero-scroll {
    ${_center("x")};
    ${_triangle(_baseUnit(), COL.white)};

    bottom: 5%;

    &::before {
      ${_center("x")};

      content: "Scroll";
      color: ${COL.white};
      display: block;
      font-size: ${TYPE.scale.sm};
      top: -${_baseUnit(3)};
    }
  }
`;

/**
 * =Hero (component)
******************************/

function Hero (props = {}) {
  const {image, strap} = props;

  return (
    <Hero_SC>

      <header className="Hero-brand">
        <Logo
          logo="logoInvert"
          size="lg"
          imgSrc={image}
        />

        <p className="Hero-strap">
          {strap}
        </p>
      </header>

      <div className="Hero-scroll"></div>

    </Hero_SC>
  );
}

export default Hero;
