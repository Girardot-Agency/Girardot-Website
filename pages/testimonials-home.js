import { withRouter } from "next/router";
import React, { Component } from "react";
import styled, { css } from "styled-components";

import DefaultLayout from "../layouts/default";

import ContentWrapper from "../components/content-wrapper";
import Copy from "../components/copy";
import Head from "../components/head";
import SectionTitle from "../components/section-title";

import exportMap from "../static/db/export-map.json";
import { _flex, _baseUnit, _screen } from "../assets/styles/mixins/_style";
import { COL, TYPE } from "../assets/styles/theme/_style";

/**
 * =Testimonial
 ************************************************************/

const TestimonialsContainer_Styled = styled.div`
	${_flex("row")};

	margin: -${_baseUnit(2.5)} 0 0 -${_baseUnit(2.5)};

	${_screen({
		xl: css`
			margin: -${_baseUnit(5)} 0 0 -${_baseUnit(5)};
		`
	})};
`;

const Testimonial_Styled = styled.section`
	margin: ${_baseUnit(2.5)} 0 0 ${_baseUnit(2.5)};
	flex-basis: 100%;

	${_screen({
		sm: css`
			flex-basis: calc(50% - ${_baseUnit(2.5)});
		`,
		md: css`
			flex-basis: calc(50% - ${_baseUnit(2.5)});
		`,
		lg: css`
			flex-basis: calc(33.3333% - ${_baseUnit(2.5)});
		`,
		xl: css`
			flex-basis: calc(25% - ${_baseUnit(5)});
			margin: ${_baseUnit(5)} 0 0 ${_baseUnit(5)};
		`
	})};

	.Testimonial-header {
		display: flex;
		height: ${_baseUnit(7.5)};
		margin-bottom: ${_baseUnit(2.5)};

		img {
			margin: auto 0;
			max-width: ${_baseUnit(12.5)};
		}
	}

	.Testimonial-footer {
		> h2 {
			color: ${COL.brand_main_base};
			font-size: ${TYPE.scale.md};
			font-weight: normal;
		}

		> p {
			color: ${COL.grey_base};
			font-size: ${TYPE.scale.xs};
		}
	}
`;

function Testimonial(props = {}) {
	const { brandLogo, body, name, position, brand } = props;

	return (
		<Testimonial_Styled>
			<header className="Testimonial-header">
				<img src={brandLogo} alt={brand} />
			</header>

			<div>
				<Copy copy={body} />
			</div>

			<div className="Testimonial-footer">
				<h2>{name}</h2>
				<p>{position}</p>
				<p>{brand}</p>
			</div>
		</Testimonial_Styled>
	);
}

/**
 * =Testimonials (page)
 ************************************************************/

function TestimonialsList(props = {}) {
	let { rels } = props;

	if (!Array.isArray(rels) || !rels.length) {
		rels = [].concat(rels);
	}

	const list = rels.map((rel, i) => {
		const relPageData = exportMap[rel];

		if (relPageData && relPageData !== undefined) {
			return (
				<Testimonial
					key={`testimonial-${i}`}
					brandLogo={relPageData.query.brandLogo}
					body={relPageData.query.body}
					name={relPageData.query.title}
					position={relPageData.query.position}
					brand={relPageData.query.brand}
				/>
			)
		}
	});

	return list;
}

class TestimonialsHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pageData: props.router.query
		};
	}

	render() {
		const { router } = this.props;
		const pageData = this.state.pageData;

		return (
			<DefaultLayout>
				<Head
					pageTitle={pageData.title}
				/>

				<SectionTitle title={pageData.title} isHeader={true} />

				<ContentWrapper>
					<TestimonialsContainer_Styled>
						{
							pageData.testimonialsRels
							&& <TestimonialsList rels={pageData.testimonialsRels} />
						}
					</TestimonialsContainer_Styled>
				</ContentWrapper>
			</DefaultLayout>
		);
	}
}

export default withRouter(TestimonialsHome);
