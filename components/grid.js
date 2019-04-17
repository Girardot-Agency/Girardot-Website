import Fade from "react-reveal/Fade";
import Link from "next/link";
import styled, {css} from "styled-components";

import ContentWrapper from "../components/content-wrapper";

import {_screen} from "../assets/styles/mixins/_style";

import {
  $_BaseUnit,
  $_Flex,
  $_PosCenter,
  $_Screen,
  $_TransAll
} from "../assets/styles/mixins.css";
import {
  COL,
  TYPE
} from "../assets/styles/theme.css";

import exportMap from "../static/db/export-map.json";

/**
 * =ViewMore
************************************************************/

/**
 * =ViewMore:styles
******************************/

const ViewMore_SC = styled.div`
  ${$_TransAll};

  border: ${$_BaseUnit(.125)} solid ${COL.brand_main_base};
  color: ${COL.brand_main_base};
  font-size: ${TYPE.scale.sm};
  margin: 0 auto;
  position: relative;
  width: ${$_BaseUnit(15)};
    max-width: 100%;
    height: ${$_BaseUnit(3.25)};

  &:hover {
    background-color: ${COL.brand_main_base};
    color: ${COL.white};
  }

  & a {
    display: block;
    width: 100%;
      height: 100%;

  } & span {
    ${$_PosCenter("xy")};
  }
`;

/**
 * =ViewMore:styles
******************************/

function ViewMore ({pageUrl}) {
  const pageData = exportMap[pageUrl];
  const route = {
    pathname: pageData.page,
    query: pageData.query
  };

  return (
    <ViewMore_SC>
      <Link
        href={route}
        as={route.query.path}
      >
        <a><span>View more</span></a>
      </Link>
    </ViewMore_SC>
  );
}

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
    { viewMorePage &&
      <ContentWrapper>
        <ViewMore pageUrl={viewMorePage} />
      </ContentWrapper>
    }
  </>);
}

export default Grid;
