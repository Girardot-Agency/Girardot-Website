/**
 * =Grid
************************************************************/

import Fade from "react-reveal/Fade";
import styled, {css} from "styled-components";

// External parts
import CTA from "../cta"
import ContentWrapper from "../../components/content-wrapper";

// Mixins/theme/helpers
import {_baseUnit, _flex, _screen} from "../../assets/styles/mixins/_style";

/**
 * =Styles
******************************/

const Grid_SC = styled.section`
  ${_flex("row")}

  margin: -${_baseUnit(2.5)} 0 0 -${_baseUnit(1.25)};

  ${_screen({
    xl: css`
      margin: -${_baseUnit(2.5)} 0 0 -${_baseUnit(2.5)};
    `
  })};

  .Grid-cell {
    margin: ${_baseUnit(1.25)} 0 0 ${_baseUnit(1.25)};
    flex-basis: 100%;

    ${_screen({
      sm: css`
        flex-basis: calc(50% - ${_baseUnit(1.25)});
      `,
      md: css`
        flex-basis: calc(50% - ${_baseUnit(1.25)});
      `,
      lg: css`
        flex-basis: calc(33.3333% - ${_baseUnit(1.25)});
      `,
      xl: css`
        flex-basis: calc(33.3333% - ${_baseUnit(2.5)});
        margin: ${_baseUnit(2.5)} 0 0 ${_baseUnit(2.5)};
      `
    })};
  }
`;

/**
 * =Component
******************************/

export default function (props = {}) {
  const {
    cells,
    viewMore
  } = props;

  return (<>
    <Grid_SC>
      {
        cells.map((cell, i) => {
          let delay = 0;
          if (i > 0) delay = i * 100;

          return (
            <div
              key={`grid-cell-${i}`}
              className="Grid-cell"
            >
              <Fade
                bottom
                duration={600}
                delay={delay}
              >
                {cell}
              </Fade>
            </div>
          );
        })
      }
    </Grid_SC>
    {
      viewMore &&
      <ContentWrapper>
        <CTA
          options={{
            type: "link",
            href: viewMore,
            text: "View more"
          }}
        />
      </ContentWrapper>
    }
  </>);
}
