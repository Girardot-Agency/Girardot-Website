/**
 * =Content wrapper
************************************************************/

import styled from "styled-components";

import {_contentWrapper, _baseUnit} from "../../assets/styles/mixins/_style";

/**
 * =Styles
******************************/

const ContentWrapper_SC = styled.section`
  ${_contentWrapper()};

  margin-top: ${_baseUnit(5)};
  margin-bottom: ${_baseUnit(5)};
`;

/**
 * =Component
******************************/

function ContentWrapper ({children}) {
  return (
    <ContentWrapper_SC>
      {children}
    </ContentWrapper_SC>
  );
}

export default ContentWrapper;
