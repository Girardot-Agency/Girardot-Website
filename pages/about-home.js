import { withRouter } from "next/router";
import React, { Component } from "react";
import styled from "styled-components";

import Copy from "../components/copy";
import ContentWrapper from "../components/content-wrapper";
import DefaultLayout from "../layouts/default";
import SectionTitle from "../components/section-title";

import { transformImage } from "../lib/helpers";
import { _baseUnit } from "../assets/styles/mixins/_style";

/**
 * =Banner
 ************************************************************/

const Banner_Styled = styled.div`
	margin-bottom: ${_baseUnit(5)};

	.Banner-image {
		position: relative;
		padding-bottom: 52%;

		img {
			max-width: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
`;

function Banner(props = {}) {
	const { src, alt } = props;

	return (
		<Banner_Styled>
			<div className="Banner-image">
				<picture>
					<source
						sizes={"100vw"}
						srcSet={`
							${transformImage(src, { w: 600 })} 400w,
							${transformImage(src, { w: 900 })} 600w,
							${transformImage(src, { w: 1200 })} 800w,
							${transformImage(src, { w: 1500 })} 1000w,
							${transformImage(src, { w: 1900 })} 1200w
							${transformImage(src, { w: 2700 })} 1800w
						`}
					/>
					<img src={transformImage(src)} alt={alt} />
				</picture>
			</div>
		</Banner_Styled>
	);
}

/**
 * =AboutHome
 ************************************************************/

class AboutHome extends Component {
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
				<SectionTitle title={pageData.title} isHeader={true} />

				<ContentWrapper>
					<Banner src={pageData.bannerImage} alt={pageData.title} />

					<Copy
						copy={pageData.body}
						options={{ copyStyle: "secondary" }}
					/>
				</ContentWrapper>
			</DefaultLayout>
		);
	}
}

export default withRouter(AboutHome);
