import React, { Component } from "react";
import { withRouter } from "next/router";
import styled from "styled-components";

import DefaultLayout from "../layouts/default";

import ContentWrapper from "../components/content-wrapper";
import Copy from "../components/copy";
import Head from "../components/head";
import SectionTitle from "../components/section-title";

// Mixins/theme/helpers
import { _baseUnit } from "../assets/styles/mixins/_style";

const BannerImage_Styled = styled.img`
	max-width: 100%;
	margin: 0 auto;
`;

class JobPage extends Component {
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

				<header>
					<SectionTitle title={pageData.title} isHeader={true} />
				</header>

				<ContentWrapper>
					<BannerImage_Styled src={pageData.bannerImage} />

					<Copy
						copy={pageData.body}
						options={{ copyStyle: "secondary" }}
					/>
				</ContentWrapper>
			</DefaultLayout>
		);
	}
}

export default withRouter(JobPage);
