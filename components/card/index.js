import Link from "next/link";
import styled from "styled-components";

// Helpers/mixins/theme
import { transformImage } from "../../lib/helpers";
import {
	_baseUnit,
	_hidden,
	_flex,
	_transition
} from "../../assets/styles/mixins/_style";
import { COL, SCREEN, TYPE } from "../../assets/styles/theme/_style";

import exportMap from "../../static/db/export-map.json";

/**
 * =Card
 ************************************************************/

/**
 * =Card:styles
 ******************************/

const Card_Styled = styled.section `
  overflow: hidden;
  position: relative;

  &:hover {
    img {transform: scale(1.05);}
  }

  .Card-image {
    width: 100%;
    padding-bottom: 56%;
    position: relative;

    img {
      ${_transition()};

      position: absolute;
      top: 0;
        left: 0;
      max-width: 100%;
    }
  }

  .Card-title {
    ${_flex("alignItemsCenter")}

    background-color: ${COL.brand_main_base};
    color: ${COL.white};
    font-size: ${TYPE.scale.xs};
      font-weight: normal;
    padding: 0 ${_baseUnit()};
    position: relative;
    width: 100%;
      height: ${_baseUnit(2.5)};
    z-index: 1;
  }

  .Card-link {
    position: absolute;
      top: 0;
      left: 0;
    width: 100%;
      height: 100%;
    z-index: 1;

    span {
      ${_hidden()};
    }
  }
`;

/**
 * =Card:component
 ******************************/

function Card({ pageData }) {
	const route = {
		pathname: pageData.page,
		query: pageData.query
	};

	return (
		<Card_Styled>
			<div className="Card-image">
				<picture>
					<source
						media={`${SCREEN.lg}`}
						sizes={"33.33vw"}
						srcSet={`
							${transformImage(pageData.query.cardImage, { w: 600 })} 300w,
							${transformImage(pageData.query.cardImage, { w: 1000 })} 500w
						`}
					/>
					<source
						media={`${SCREEN.sm}`}
						sizes={"50vw"}
						srcSet={`
							${transformImage(pageData.query.cardImage, { w: 600 })} 300w,
							${transformImage(pageData.query.cardImage, { w: 1000 })} 500w
			            `}
					/>
					<source
						sizes={"100vw"}
						srcSet={`
							${transformImage(pageData.query.cardImage, { w: 800 })} 400w,
							${transformImage(pageData.query.cardImage, { w: 1200 })} 600w
			            `}
					/>
					<img
						src={transformImage(pageData.query.cardImage)}
						alt={pageData.query.title}
					/>
				</picture>
			</div>

			<h3 className="Card-title">{pageData.query.title}</h3>

			<Link
				passHref
				href={route}
				as={pageData.query.path}
				prefetch
				scroll={false}
			>
				<a className="Card-link" title={pageData.query.title}>
					<span>Go to: {pageData.query.title}</span>
				</a>
			</Link>
		</Card_Styled>
	);
}

export default Card;

/**
 * =Cards
 ************************************************************/

export function cards(rels) {
	let cards = [];

	if (!Array.isArray(rels) || !rels.length) {
		rels = [].concat(rels);
	}

	rels.map((rel, i) => {
		const relPageData = exportMap[rel];

		if (relPageData && relPageData !== undefined) {
			cards.push(<Card key={`card-${i}`} pageData={relPageData} />);
		}
	});

	return cards;
}
