import Fade from "react-reveal/Fade";
import styled, {css} from "styled-components";

import CTA from "../cta"
import ContentWrapper from "../../components/content-wrapper";

import {_screen} from "../../assets/styles/mixins/_style";

import {
  $_BaseUnit,
  $_Flex,
} from "../../assets/styles/mixins.css";

/**
 * =Grid
************************************************************/

/**
 * =Grid:styles
******************************/

const Grid_SC = styled.section`
  ${$_Flex("row")}

  margin: -${$_BaseUnit(2.5)} 0 0 -${$_BaseUnit(1.25)};

  ${_screen({
    xl: css`
      margin: -${$_BaseUnit(2.5)} 0 0 -${$_BaseUnit(2.5)};
    `
  })};
`;

const GridCell_SC = styled.div`
  margin: ${$_BaseUnit(1.25)} 0 0 ${$_BaseUnit(1.25)};
  flex-basis: 100%;

  ${_screen({
    sm: css`
      flex-basis: calc(50% - ${$_BaseUnit(1.25)});
    `,
    md: css`
      flex-basis: calc(50% - ${$_BaseUnit(1.25)});
    `,
    lg: css`
      flex-basis: calc(33.3333% - ${$_BaseUnit(1.25)});
    `,
    xl: css`
      flex-basis: calc(33.3333% - ${$_BaseUnit(2.5)});
      margin: ${$_BaseUnit(2.5)} 0 0 ${$_BaseUnit(2.5)};
    `
  })};
`;

/**
 * =Grid:component
******************************/

function Grid (props = {}) {
  const {
    cells,
    viewMorePage
  } = props;

  return (<>
    <Grid_SC>
      {cells.map((cell, i) => {
        let delay = 0;
        if (i > 0) delay = i * 100;

        return (
          <GridCell_SC key={`grid-cell-${i}`}>
            <Fade bottom duration={600} delay={delay}>
              {cell}
            </Fade>
          </GridCell_SC>
        );
      })}
    </Grid_SC>
    {
      viewMorePage &&
      <ContentWrapper>
        {/* <CTA
          pageUrl={viewMorePage}

        /> */}
      </ContentWrapper>
    }
  </>);
}

export default Grid;
