import Router, { withRouter } from "next/router";
import React, { Component } from "react";

import Fade from "react-reveal/Fade";
import { StickyContainer, Sticky } from "react-sticky";
import styled, { css } from "styled-components";
import Div100vh from "react-div-100vh";

import DefaultLayout from "../layouts/default";

import Button from "../components/button";
import Copy from "../components/copy";
import Head from "../components/head";

import { transformImage } from "../lib/helpers";
import { _baseUnit, _contentWrapper, _screen, _flex } from "../assets/styles/mixins/_style";
import { SCREEN } from "../assets/styles/theme/_style";

/**
 * =Content
 ************************************************************/

const Content_Styled = styled.section`
	${_contentWrapper()};
	${_flex("row")};

	position: relative;
	margin-top: ${_baseUnit(2)};

	&::before {
		content: "";
		display: block;

		flex-basis: 100%;
		${_screen({
			lg: css`
				flex-basis: 50%;
			`
		})};
	}

	.Content-inner {
		flex-basis: 100%;
		margin-top: ${_baseUnit(2)};
		margin-bottom: ${_baseUnit(5)};

		${_screen({
			lg: css`
				flex-basis: calc(50% - ${_baseUnit(2)});
				margin-top: ${_baseUnit(4)};
				padding-left: ${_baseUnit(2)};
			`
		})};
	}
`;

function Content({ children }) {
	return (
		<Content_Styled>
			<div className="Content-inner">{children}</div>
		</Content_Styled>
	);
}

/**
 * =BannerImg
 ************************************************************/

const Banner_Styled = styled.div`
	overflow: hidden;
	position: relative;
	z-index: 200;

	${
		_screen({
			lg: css`
				max-width: 50vw;
				padding-top: ${_baseUnit(5)};
				position: absolute;
				top: 0;
				left: 0;
				width: 50vw;
			`
		})
	};

	.Banner-image {
		position: relative;
		padding-bottom: 100%;

		img {
			top: 0;
			/* right: 50%; */
			right: 0;
			min-height: 100%;
			min-width: 100%;
			position: absolute;
			/* transform: translateX(50%); */
			z-index: 0;
		}
	}
`;

const BackButton_Styled = styled.div`
	position: absolute;
	bottom: 0;

	${_screen({
		lg: css`
			bottom: 22.5%;
		`
	})};
`;

class BackButton extends Component {
	constructor(props) {
		super(props);
	}

	handleBackClick() {
		return setTimeout(() => {
			Router.back();
		}, 600);
	}

	render() {
		return (
			<BackButton_Styled>
				<Button
					handleClick={this.handleBackClick.bind(this)}
					options={{
						shrink: true,
						style: "secondary",
						text: "Back",
						type: "cta"
					}}
				/>
			</BackButton_Styled>
		);
	}
}

function Banner({ isSticky, src, alt }) {
	return (
		<Sticky disableCompensation={true}>
			{({ style }) => {
				return (
					<Banner_Styled style={isSticky ? style : {}}>
						<Fade left delay={600} duration={600}>
							<Div100vh className="Banner-image" style={{height: "calc(100rvh - 75px)"}}>
								<picture>
									<source
										media={`${SCREEN.lg}`}
										sizes={"50vw"}
										srcSet={`
											${transformImage(src, { w: 900 })} 600w,
											${transformImage(src, { w: 1200 })} 800w,
											${transformImage(src, { w: 1500 })} 1000w,
											${transformImage(src, { w: 2100 })} 1400w,
											${transformImage(src, { w: 2800 })} 1800w
                    					`}
									/>
									<source
										sizes={"100vw"}
										srcSet={`
											${transformImage(src, { w: 600 })} 400w,
											${transformImage(src, { w: 900 })} 600w,
											${transformImage(src, { w: 1200 })} 800w,
											${transformImage(src, { w: 1500 })} 1000w,
											${transformImage(src, { w: 1800 })} 1200w
										`}
									/>
									<img src={transformImage(src)} alt={alt} />
								</picture>

								<BackButton />
							</Div100vh>
						</Fade>
					</Banner_Styled>
				);
			}}
		</Sticky>
	);
}

/**
 * =Container
 ************************************************************/

const Container_Styled = styled(StickyContainer)`
	padding-top: ${_baseUnit(5)};
	min-height: 100vh;
`;

function Container({ children }) {
	return <Container_Styled>{children}</Container_Styled>;
}

/**
 * =OurWorkPage
 ************************************************************/

function setSticky(state) {
	if (window.matchMedia(SCREEN.lg).matches) {
		return state.setState({ isSticky: true });
	}
	return state.setState({ isSticky: false });
}

class OurWorkPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pageData: props.router.query,
			isSticky: ""
		};
	}

	componentDidMount() {
		setSticky(this);
		window.addEventListener("resize", e => setSticky(this));
	}

	render() {
		const { router } = this.props;
		const pageData = this.state.pageData;

		return (
			<DefaultLayout>
				<Head
					pageTitle={pageData.title}
				/>

				<Container>
					<Banner
						isSticky={this.state.isSticky}
						src={pageData.bannerImage}
						alt={pageData.title}
					/>

					<Content>
						<Copy
							copy={pageData.body}
							options={{
								gallery: pageData.gallery
							}}
						/>
					</Content>
				</Container>
			</DefaultLayout>
		);
	}
}

export default withRouter(OurWorkPage);
