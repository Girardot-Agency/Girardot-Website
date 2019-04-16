import styled, {css} from "styled-components";

import {
  COL,
  TITLE,
  TYPE
} from "../assets/styles/theme.css";

import {
  $_Flex,
  $_Screen,
  $_BaseUnit
} from "../assets/styles/mixins.css";

/**
 * =SectionTitle
************************************************************/

/**
 * =SectionTitle:styles
******************************/

const SectionTitle_SC = styled.h2`
  ${$_Flex("rowCenterAll")};

  background-color: ${COL.brand_main_base};
  color: ${COL.white};
  font-family: "apercu-bold", sans-serif;
    font-size: ${TYPE.scale.sm};
    font-weight: normal;
  height: ${$_BaseUnit(5)};
  text-align: center;
`;

/**
 * =SectionTitle:component
******************************/

function SectionTitle ({title}) {
  return (
    <SectionTitle_SC>
      {title}
    </SectionTitle_SC>
  );
}

export default SectionTitle;
