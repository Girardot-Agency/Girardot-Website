import styled, {css} from "styled-components";

import {
  $_ContentWrapper,
  $_Screen,
  $_BaseUnit
} from "../assets/styles/mixins.css";

import {
  BASE
} from "../assets/styles/theme.css";

/**
 * =Grid
************************************************************/

/**
 * =Grid:styles
******************************/

const ContentWrapper_SC = styled.section`
  ${$_ContentWrapper};

  margin-top: ${$_BaseUnit(5)};
  margin-bottom: ${$_BaseUnit(5)};
`;

/**
 * =Grid:component
******************************/

function Grid ({children}) {
  return (
    <ContentWrapper_SC>
      {children}
    </ContentWrapper_SC>
  );
}

export default Grid;
