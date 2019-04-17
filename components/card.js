import Link from "next/link";
import styled from "styled-components";

import {transformImage} from "../lib/helpers";

import {_baseUnit} from "../assets/styles/mixins/_style";

import {
  $_Hidden,
  $_Flex,
  $_TransAll,
  $_BaseUnit
} from "../assets/styles/mixins.css";
import {
  BASE,
  COL,
  SCREEN,
  TYPE
} from "../assets/styles/theme.css";

import exportMap from "../static/db/export-map.json";

/**
 * =Card
************************************************************/

/**
 * =Card:styles
******************************/

const Card_SC = styled.section`
  overflow: hidden;
  position: relative;

  &:hover {
    img {transform: scale(1.05);}
  }
`;

const CardImg_SC = styled.div`
  & img {
    ${$_TransAll};

    max-width: 100%;
  }
`;

const CardTitle_SC = styled.h3`
  ${$_Flex("alignItemsCenter")}

  background-color: ${COL.brand_main_base};
  color: ${COL.white};
  font-size: ${TYPE.scale.xs};
  font-weight: normal;
  height: ${BASE.unit * 2.5}px;
  padding: 0 ${_baseUnit()};
  position: relative;
  width: 100%;
  z-index: 1;
`;

const CardLink_SC = styled.a`
  position: absolute;
    top: 0;
    left: 0;
  width: 100%;
    height: 100%;
  z-index: 1;

  & > span {
    ${$_Hidden};
  }
`;

/**
 * =Card:component
******************************/

function Card ({pageData}) {
  const route = {
    pathname: pageData.page,
    query: pageData.query
  };

  return (
    <Card_SC>

      <CardImg_SC>
        <picture>
          <source
            media={`${SCREEN.lg}`}
            sizes={"33.33vw"}
            srcSet={`
              ${transformImage(pageData.query.cardImage, {w: 300})} 300w,
              ${transformImage(pageData.query.cardImage, {w: 500})} 500w
            `}
          />
          <source
            media={`${SCREEN.sm}`}
            sizes={"50vw"}
            srcSet={`
              ${transformImage(pageData.query.cardImage, {w: 300})} 300w,
              ${transformImage(pageData.query.cardImage, {w: 500})} 500w
            `}
          />
          <source
            sizes={"100vw"}
            srcSet={`
              ${transformImage(pageData.query.cardImage, {w: 400})} 400w,
              ${transformImage(pageData.query.cardImage, {w: 600})} 600w
            `}
          />
          <img
            src={transformImage(pageData.query.cardImage)}
            alt={pageData.query.title}
          />
        </picture>
      </CardImg_SC>

      <CardTitle_SC>
        {pageData.query.title}
      </CardTitle_SC>

      <Link
        passHref
        href={route}
        as={pageData.query.path}
        prefetch>

        <CardLink_SC title={pageData.query.title}>
          <span>Go to: {pageData.query.title}</span>
        </CardLink_SC>
      </Link>

    </Card_SC>
  );
}

export default Card;

/**
 * =Cards
************************************************************/

export function cards (data) {
  let cards = [];

  data.map((rel, i) => {
    const relPageData = exportMap[rel];

    if (relPageData && relPageData !== undefined) {
      cards.push(
        <Card
          key={`card-${i}`}
          pageData={relPageData}
        />
      );
    }
  });

  return cards;
}
