/**
 * =Logo
************************************************************/

import styled from "styled-components";

import { PUBLIC } from "../../lib/_config";
import branding from "../../content/settings/branding.json";

/**
 * =Styles
******************************/

const Logo_Styled = styled.img`
  max-width: 100%;
  width: ${props => props.size.default}px;
`;

/**
 * =Component
******************************/

export default function (props = {}) {
  let {
    logo,
    size,
    imgSrc
  } = props;

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
    <Logo_Styled
      size={size}

      width={size.default}
      src={`${PUBLIC.path}${src}`}
      alt="Girardot logo" />
  );
}
