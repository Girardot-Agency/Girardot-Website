/**
 * =Profile
 ************************************************************/

import React, { Component } from "react";
import styled from "styled-components";

import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";
import Markdown from "markdown-to-jsx";

// External parts
import Modal from "../modal";

// Misins/theme/helpers etc
import { PUBLIC } from "../../lib/_config";
import { _transition, _baseUnit } from "../../assets/styles/mixins/_style";
import { COL, TYPE } from "../../assets/styles/theme/_style";
import exportMap from "../../static/db/export-map.json";

/**
 * =Styles
 ******************************/

const Profile_Styled = styled.section`
	margin-top: ${_baseUnit(2)};
	text-align: center;

	.Profile-title {
		${_transition()};

		color: ${COL.brand_main_base};
		cursor: pointer;
		display: inline-block;
		font-size: ${TYPE.scale.md};
		font-weight: normal;
		margin-top: ${_baseUnit(1.5)};

		&:hover {
			color: ${COL.brand_main_darkest};
		}
	}

	.Profile-image {
		margin: 0 auto;
		max-width: 100%;
		height: ${_baseUnit(10)};
	}

	.Profile-position {
		font-size: ${TYPE.scale.xs};
		color: ${COL.grey_base};
	}
`;

const ProfileModal_Styled = styled.div`
	.Profile-modalTitle {
		color: ${COL.brand_main_base};
		font-size: ${TYPE.scale.md};
		font-weight: normal;
	}

	.Profile-modalPosition {
		font-size: ${TYPE.scale.xs};
		color: ${COL.grey_base};
	}

	.Profile-modalCopy {
		line-height: 1.5;

		& p {
			margin-top: 1em;
		}
	}

	.Profile-modalClose {
		border: none;
		cursor: pointer;
		padding: 0;
		position: absolute;
		top: ${_baseUnit()};
		right: ${_baseUnit()};

		& svg {
			width: ${_baseUnit(2)};
			height: ${_baseUnit(2)};
		}

		& .Close-x {
			fill: transparent;
			stroke: ${COL.brand_main_base};
			stroke-linecap: round;
			stroke-width: 5;

			${_transition()};
		}

		&:hover .Close-x {
			stroke: ${COL.brand_main_darkest};
		}
	}
`;

/**
 * =Compeonent
 ******************************/

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: false
		};
	}

	targetElement = null;

	componentDidMount() {
		this.targetElement = document.querySelector(`#${this.props.key}`);
	}

	handleOpenModal() {
		disableBodyScroll(this.targetElement, {
			reserveScrollBarGap: true
		});

		this.setState({
			modalIsOpen: true
		});
	}

	handleCloseModal() {
		enableBodyScroll(this.targetElement);

		this.setState({
			modalIsOpen: false
		});
	}

	render() {
		return (
			<Profile_Styled>
				<img
					className="Profile-image"
					src={`${PUBLIC.path}${this.props.profileImage}`}
					alt={this.props.title}
				/>

				<h2
					className="Profile-title"
					onClick={this.handleOpenModal.bind(this)}
				>
					{this.props.title}
				</h2>

				<p className="Profile-position">{this.props.position}</p>

				<Modal modalIsOpen={this.state.modalIsOpen}>
					<ProfileModal_Styled>
						<button
							onClick={this.handleCloseModal.bind(this)}
							className="Profile-modalClose"
						>
							<svg viewBox="0 0 40 40">
								<path
									className="Close-x"
									d="M 10,10 L 30,30 M 30,10 L 10,30"
								/>
							</svg>
						</button>

						<h2 className="Profile-modalTitle">
							{this.props.title}
						</h2>

						<p className="Profile-modalPosition">
							{this.props.position}
						</p>

						<div className="Profile-modalCopy">
							<Markdown children={this.props.biog} />
						</div>
					</ProfileModal_Styled>
				</Modal>
			</Profile_Styled>
		);
	}
}

/**
 * =Profiles
 ************************************************************/

export function profiles(data) {
	let profiles = [];

	data.map((rel, i) => {
		const relPageData = exportMap[rel];

		if (relPageData && relPageData !== undefined) {
			profiles.push(
				<Profile
					key={`profile-${i}`}
					title={relPageData.query.title}
					profileImage={relPageData.query.profileImage}
					position={relPageData.query.position}
					biog={relPageData.query.body}
				/>
			);
		}
	});

	return profiles;
}
