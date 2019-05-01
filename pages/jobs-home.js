import Link from "next/link";
import { withRouter } from "next/router";
import React, { Component } from "react";
import styled from "styled-components";

import DefaultLayout from "../layouts/default";

import ContentWrapper from "../components/content-wrapper";
import Head from "../components/head";
import SectionTitle from "../components/section-title";

import exportMap from "../static/db/export-map.json";
import { _baseUnit, _hover } from "../assets/styles/mixins/_style";
import { COL, TYPE } from "../assets/styles/theme/_style";

const JobsContainer_Styled = styled.div`
	margin: 0 auto;
	text-align: center;
	width: ${_baseUnit(50)};
	max-width: 100%;
`;

const JobSummary_Styled = styled.div`
	margin-bottom: ${_baseUnit(1.5)};
	padding-bottom: ${_baseUnit(1.5)};

	&:nth-last-child(1n + 2) {
		border-bottom: 1px solid ${COL.grey_lightest};
	}

	.JobSummary-link {
		${_hover(COL.brand_main_base, COL.brand_main_dark)};

		font-size: ${TYPE.scale.md};
		font-weight: normal;
	}
`;

function JobSumary({ pageData }) {
	const route = {
		pathname: pageData.page,
		query: pageData.query
	};

	return (
		<JobSummary_Styled>
			<h2>
				<Link
					passHref
					href={route}
					as={pageData.query.path}
					prefetch
					scroll={false}
				>
					<a className="JobSummary-link" title={pageData.query.title}>
						{pageData.query.title}
					</a>
				</Link>
			</h2>
		</JobSummary_Styled>
	);
}

function JobsList (props = {}) {
	let {rels} = props;

	if (!Array.isArray(rels) || !rels.length) {
		rels = [].concat(rels);
	}

	const list = rels.map((rel, i) => {
		const relPageData = exportMap[rel];

		if (relPageData && relPageData !== undefined) {
			return (
				<JobSumary
					key={`job-${i}`}
					pageData={relPageData}
				/>
			);
		}
	})

	return list;
}

class JobsHome extends Component {
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
					<JobsContainer_Styled>
						{
							pageData.jobsRels
							&& <JobsList rels={pageData.jobsRels} />
						}
					</JobsContainer_Styled>
				</ContentWrapper>
			</DefaultLayout>
		);
	}
}

export default withRouter(JobsHome);
