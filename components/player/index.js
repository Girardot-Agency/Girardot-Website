import React, {Component} from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";

import Button from "../button";

import { _baseUnit, _center, _flex, _transition } from "../../assets/styles/mixins/_style";
import { COL } from "../../assets/styles/theme/_style";

/**
 * =Player wrapper
************************************************************/

const PlayerWrapper_Styled = styled.div`
	position: relative;
	box-shadow: 1px 4px 11px -3px rgba(0, 0, 0, 0.35);

	.PlayerWrapper-button {
		position: absolute;
		bottom: 0;
		line-height: 0;
		right: 0;
		z-index: 1;
	}

	.PlayerWrapper-playButton {
		display: none;
	}

	&.isOpen {
		${ _flex("rowCenterAll") };
		${ _transition() };

		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1000;
		background-color: rgba(0, 0, 0, .85);

		.PlayerWrapper-inner {
			width: ${ _baseUnit(50) };
			max-width: 100%;
		}

		.PlayerWrapper-button {
			top: 0;
		}

		.PlayerWrapper-playButton {
			${ _center("xy") };

			display: block;
			z-index: 1;
		}
	}
`;

const PseudoPlayerWrapper_Styled = styled.div`
	display: none;

	&.isOpen {
		display: block;
		width: 100%;
		padding-bottom: ${props => props.aspectRatio};
		position: relative;
		margin: 50px 0;
	}
`;

function PlayerWrapper ({ children, isOpen, aspectRatio, id }) {
	return (<>
		<PseudoPlayerWrapper_Styled
			className={ isOpen && "isOpen" }
			aspectRatio={ aspectRatio }
		/>

		<PlayerWrapper_Styled
			className={ isOpen && "isOpen" }
			id={id}
		>
			<div className="PlayerWrapper-inner">
				{children}
			</div>
		</PlayerWrapper_Styled>
	</>)
}

/**
 * =Player
************************************************************/

export default class Player extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: `video-${ Math.random().toString().split(".").pop() }`,
			isOpen: false,
			isPlaying: false,
			aspectRatio: this.props.ar ? this.props.ar : "56.25%",
			branding: this.props.branding === "show" ? true : false
		}
	}

	targetElement = null;
	componentDidMount() {
		this.targetElement = document.querySelector(`#${this.props.id}`);
	}

	handleClick() {
		if (!this.state.isOpen) {
			disableBodyScroll(this.targetElement, {reserveScrollBarGap: true});
		} else {
			enableBodyScroll(this.targetElement);
		}
		this.setState({
			isOpen: !this.state.isOpen ? true : false
		});
	}

	handlePlay() {
		this.setState({
			isPlaying: !this.state.isPlaying ? true : false
		});
	}

	onEnded() {
		this.setState({
			isPlaying: false
		});
	}

	render() {
		return (
			<PlayerWrapper
				id={ this.state.id }
				isOpen={this.state.isOpen}
				aspectRatio={this.state.aspectRatio}
			>

				<div className="PlayerWrapper-button">
					{ !this.state.branding && (
						<Button
							handleClick={this.handlePlay.bind(this)}
							options={{
								icon: this.state.isPlaying
									? "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjQxNDIxOyI+CiAgICA8cGF0aCBkPSJNOTYsNDQ4TDIwMi43LDQ0OEwyMDIuNyw2NEw5Niw2NEw5Niw0NDhaTTMwOS4zLDY0TDMwOS4zLDQ0OEw0MTYsNDQ4TDQxNiw2NEwzMDkuMyw2NFoiIHN0eWxlPSJmaWxsOndoaXRlO2ZpbGwtcnVsZTpub256ZXJvOyIvPgo8L3N2Zz4K"
									: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjQxNDIxOyI+CiAgICA8cGF0aCBkPSJNOTYsNTJMOTYsNDYwTDQxNiwyNTZMOTYsNTJaIiBzdHlsZT0iZmlsbDp3aGl0ZTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KPC9zdmc+Cg==",
								size: "icon",
								type: "cta",
								style: "tertiary"
							}}
						/>
					)}
					<Button
						handleClick={this.handleClick.bind(this)}
						options={{
							icon: this.state.isOpen
								? "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjQxNDIxOyI+CiAgICA8cGF0aCBkPSJNNDA1LDEzNi43OThMMzc1LjIwMiwxMDdMMjU2LDIyNi4yMDJMMTM2Ljc5OCwxMDdMMTA3LDEzNi43OThMMjI2LjIwMiwyNTZMMTA3LDM3NS4yMDJMMTM2Ljc5OCw0MDVMMjU2LDI4NS43OThMMzc1LjIwMiw0MDVMNDA1LDM3NS4yMDJMMjg1Ljc5OCwyNTZMNDA1LDEzNi43OThaIiBzdHlsZT0iZmlsbDp3aGl0ZTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KPC9zdmc+Cg=="
								: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjQxNDIxOyI+CiAgICA8cGF0aCBkPSJNMzk2Ljc5NSwzOTYuOEwzMjAsMzk2LjhMMzIwLDQ0OEw0NDgsNDQ4TDQ0OCwzMjBMMzk2Ljc5NSwzMjBMMzk2Ljc5NSwzOTYuOFpNMzk2LjgsMTE1LjIwNUwzOTYuOCwxOTJMNDQ4LDE5Mkw0NDgsNjRMMzIwLDY0TDMyMCwxMTUuMjA1TDM5Ni44LDExNS4yMDVaTTExNS4yMDUsMTE1LjJMMTkyLDExNS4yTDE5Miw2NEw2NCw2NEw2NCwxOTJMMTE1LjIwNSwxOTJMMTE1LjIwNSwxMTUuMlpNMTE1LjIsMzk2Ljc5NUwxMTUuMiwzMjBMNjQsMzIwTDY0LDQ0OEwxOTIsNDQ4TDE5MiwzOTYuNzk1TDExNS4yLDM5Ni43OTVaIiBzdHlsZT0iZmlsbDp3aGl0ZTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KPC9zdmc+Cg==",
							size: "icon",
							type: "cta",
							style: "tertiary"
						}}
					/>
				</div>

				<div
					style={{
						paddingBottom: this.state.aspectRatio,
						position: "relative",
						margin: this.state.isOpen ? "0" : "50px 0"
					}}
				>
					{ this.state.isOpen
						&& (
							<div className="PlayerWrapper-playButton">
								<Button
									handleClick={this.handlePlay.bind(this)}
									options={{
										icon: this.state.isPlaying
											? "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjQxNDIxOyI+CiAgICA8cGF0aCBkPSJNOTYsNDQ4TDIwMi43LDQ0OEwyMDIuNyw2NEw5Niw2NEw5Niw0NDhaTTMwOS4zLDY0TDMwOS4zLDQ0OEw0MTYsNDQ4TDQxNiw2NEwzMDkuMyw2NFoiIHN0eWxlPSJmaWxsOndoaXRlO2ZpbGwtcnVsZTpub256ZXJvOyIvPgo8L3N2Zz4K"
											: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjQxNDIxOyI+CiAgICA8cGF0aCBkPSJNOTYsNTJMOTYsNDYwTDQxNiwyNTZMOTYsNTJaIiBzdHlsZT0iZmlsbDp3aGl0ZTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KPC9zdmc+Cg==",
										size: "icon",
										type: "cta",
										style: "tertiary"
									}}
								/>
							</div>
						)
					}
					<ReactPlayer
						playing={ this.state.isPlaying }
						onEnded={ this.onEnded.bind(this) }
						url={ this.props.url }
						width="100%"
						height="100%"
						style={{
							position: "absolute",
							top: "0",
							left: "0"
						}}
						config={{
							youtube: {
								playerVars: {
									controls: 1,
									fs: 0,
									modestbranding: 1
								}
							},
							vimeo: {
								playerOptions: {
									controls: this.state.branding,
									color: "dd4f3c"
								}
							}
						}}
					/>
				</div>
			</PlayerWrapper>
		);
	};
}
