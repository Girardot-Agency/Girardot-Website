import styled, {css} from "styled-components";

import branding from "../content/settings/branding.json";

import {$_Screen} from "../assets/styles/mixins.css";

/**
 * =Logo
************************************************************/

/**
 * =Logo:styles
******************************/

const Logo_SC = styled.img`
  max-width: 100%;
  width: ${props => props.size.default}px;
`;

/**
 * =Logo:component
 * Log is 22% of viewport
******************************/

function Logo ({logo, size, imgSrc}) {
  const smLogo = 173,
        mdLogo = 274,
        lgLogo = 564;

  const sizes = {
    sm: {default: `${smLogo * .75}`},
    md: {default: `${mdLogo * .75}`},
    lg: {default: `${lgLogo * .75}`}
  };

  let src = branding[logo];
  if (imgSrc) src = imgSrc;

  size = sizes[size];

  return (
    <Logo_SC
      size={size}

      width={size.default}
      src={src}
      alt="Girardot logo" />
  );
}

export default Logo;
