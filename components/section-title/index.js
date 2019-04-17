/**
 * =SectionTitle
************************************************************/

import styled from "styled-components";

// Theme/mixins
import {COL, TYPE} from "../../assets/styles/theme/_style"
import {_flex, _baseUnit} from "../../assets/styles/mixins/_style";

/**
 * =Styles
******************************/

const SectionTitle_Styled = styled.h2`
  ${_flex("rowCenterAll")};

  background-color: ${COL.brand_main_base};
  color: ${COL.white};
  font-family: "apercu-bold", sans-serif;
    font-size: ${TYPE.scale.sm};
    font-weight: normal;
  height: ${_baseUnit(5)};
  text-align: center;
`;

/**
 * =Component
******************************/

export default function ({title}) {
  return (
    <SectionTitle_Styled>
      {title}
    </SectionTitle_Styled>
  );
}
