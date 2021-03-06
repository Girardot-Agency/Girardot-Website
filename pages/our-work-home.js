import Link from "next/link";
import Router, { withRouter } from "next/router";
import React, { Component } from "react";
import { fadeIn, fadeOut } from "react-animations";
import styled, { keyframes } from "styled-components";

import DefaultLayout from "../layouts/default";

import Card, { cards } from "../components/card";
import ContentWrapper from "../components/content-wrapper";
import Grid from "../components/grid";
import Head from "../components/head";

import exportMap from "../static/db/export-map.json";
import { _flex, _baseUnit } from "../assets/styles/mixins/_style";
import { COL, TYPE } from "../assets/styles/theme/_style";

/**
 * =SubMenu
 ************************************************************/

const SubMenu_Styled = styled.div`
	background-color: ${COL.brand_main_base};
	color: ${COL.white};
	font-size: ${TYPE.scale.sm};
	font-weight: normal;
	margin-top: ${_baseUnit(5)};
	min-height: ${_baseUnit(5)};
	text-align: center;
`;

const SubMenuList_Styled = styled.ul`
	${_flex("rowCenterAll")};

	min-height: inherit;
	padding: ${_baseUnit()};

	> li:nth-child(1n + 2) {
		margin-left: ${_baseUnit()};
		padding: ${_baseUnit(0.25)} 0;
	}
`;

function SubMenuItems({ handleClick }) {
	const ourWorkCategories = exportMap["/our-work/index.html"].query.ourWorkCategoryRels;
	const ourWorkHome = exportMap["/our-work/index.html"];

	let menuItems = [
		<li key={"all-projects"}>
			<Link
				href={{
					pathname: ourWorkHome.page,
					query: ourWorkHome.query
				}}
				as={ourWorkHome.query.path}
				scroll={false}
			>
				<a onClick={handleClick}>All Projects</a>
			</Link>
		</li>
	];

	ourWorkCategories.map((pageUrl, i) => {
		const pageData = exportMap[pageUrl];

		if (pageData && pageData !== undefined) {
			const route = {
				pathname: pageData.page,
				query: pageData.query
			};

			menuItems.push(
				<li key={`category-${i}`}>
					<Link href={route} as={pageData.query.path} scroll={false}>
						<a onClick={handleClick}>{pageData.query.title}</a>
					</Link>
				</li>
			);
		}
	});

	return <SubMenuList_Styled>{menuItems}</SubMenuList_Styled>;
}

function SubMenu({ handleClick }) {
	return (
		<SubMenu_Styled>
			<SubMenuItems handleClick={handleClick} />
		</SubMenu_Styled>
	);
}

/**
 * =Transition
 ************************************************************/

const animationTime = 500;
const animateIn = keyframes`${fadeIn}`;
const animateOut = keyframes`${fadeOut}`;

const Transition_SC = styled.div`
	&.is-active {
		animation: ${animateOut} ${animationTime}ms ease-in-out,
			${animateIn} ${animationTime}ms ease-in-out ${animationTime}ms;
	}
`;

/**
 * =OurWorkHome
 ************************************************************/

class OurWorkHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			activeClass: "",
			pageData: this.props.router.query
		};
	}

	handleClick() {
		setTimeout(() => {
			this.setState({
				active: !this.state.active,
				activeClass: "is-active"
			});
		}, 100);

		setTimeout(() => {
			this.setState({
				pageData: this.props.router.query
			});
		}, animationTime);

		setTimeout(() => {
			this.setState({
				activeClass: "is-inactive"
			});
		}, animationTime * 2.05);
	}

	render() {
		const { router } = this.props;
		const pageData = this.state.pageData;

		return (
			<DefaultLayout>
				<Head pageTitle={pageData.title} />

				<SubMenu handleClick={this.handleClick.bind(this)} />
				<ContentWrapper>
					<Transition_SC className={this.state.activeClass}>
						{pageData.ourWorkRels && (
							<Grid
								cells={cards(pageData.ourWorkRels)}
								buttonOptions={{
									type: "loadMore",
									align: "center"
								}}
							/>
						)}
					</Transition_SC>
				</ContentWrapper>
			</DefaultLayout>
		);
	}
}

export default withRouter(OurWorkHome);
