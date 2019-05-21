import React, {Component} from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";

import Button from "../button";

import { _flex, _transition } from "../../assets/styles/mixins/_style";
import { COL } from "../../assets/styles/theme/_style";

/**
 * =Player wrapper
************************************************************/

const PlayerWrapper_Styled = styled.div`
	position: relative;

	.PlayerWrapper-button {
		position: absolute;
		bottom: 0;
		line-height: 0;
		right: 0;
		z-index: 1;
	}

	&.isActive {
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
			width: 50%;
		}

		.PlayerWrapper-button {
			top: 0;
		}
	}
`;

const PseudoPlayerWrapper_Styled = styled.div`
	display: none;

	&.isActive {
		display: block;
		width: 100%;
		padding-bottom: ${props => props.aspectRatio};
		position: relative;
		margin: 50px 0;
	}
`;

function PlayerWrapper ({ children, isActive, aspectRatio }) {
	return (<>
		<PseudoPlayerWrapper_Styled
			className={ isActive && "isActive" }
			aspectRatio={ aspectRatio }
		/>

		<PlayerWrapper_Styled
			className={ isActive && "isActive" }
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
			isActive: false,
			aspectRatio: this.props.ar ? this.props.ar : "56.25%"
		}
	}

	handleClick() {
		this.setState({
			isActive: !this.state.isActive ? true : false
		});
	}

	render() {
		return (
			<PlayerWrapper
				isActive={this.state.isActive}
				aspectRatio={this.state.aspectRatio}
			>

				<div className="PlayerWrapper-button">
					<Button
						handleClick={this.handleClick.bind(this)}
						options={{
							icon: this.state.isActive
								? "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjQxNDIxOyI+CiAgICA8cGF0aCBkPSJNNDA1LDEzNi43OThMMzc1LjIwMiwxMDdMMjU2LDIyNi4yMDJMMTM2Ljc5OCwxMDdMMTA3LDEzNi43OThMMjI2LjIwMiwyNTZMMTA3LDM3NS4yMDJMMTM2Ljc5OCw0MDVMMjU2LDI4NS43OThMMzc1LjIwMiw0MDVMNDA1LDM3NS4yMDJMMjg1Ljc5OCwyNTZMNDA1LDEzNi43OThaIiBzdHlsZT0iZmlsbDp3aGl0ZTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KPC9zdmc+Cg=="
								: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjQxNDIxOyI+CiAgICA8cGF0aCBkPSJNMzk2Ljc5NSwzOTYuOEwzMjAsMzk2LjhMMzIwLDQ0OEw0NDgsNDQ4TDQ0OCwzMjBMMzk2Ljc5NSwzMjBMMzk2Ljc5NSwzOTYuOFpNMzk2LjgsMTE1LjIwNUwzOTYuOCwxOTJMNDQ4LDE5Mkw0NDgsNjRMMzIwLDY0TDMyMCwxMTUuMjA1TDM5Ni44LDExNS4yMDVaTTExNS4yMDUsMTE1LjJMMTkyLDExNS4yTDE5Miw2NEw2NCw2NEw2NCwxOTJMMTE1LjIwNSwxOTJMMTE1LjIwNSwxMTUuMlpNMTE1LjIsMzk2Ljc5NUwxMTUuMiwzMjBMNjQsMzIwTDY0LDQ0OEwxOTIsNDQ4TDE5MiwzOTYuNzk1TDExNS4yLDM5Ni43OTVaIiBzdHlsZT0iZmlsbDp3aGl0ZTtmaWxsLXJ1bGU6bm9uemVybzsiLz4KPC9zdmc+Cg==",
							size: "icon",
							type: "cta",
							style: "tertiary",
						}}
					/>
				</div>

				<div
					style={{
						paddingBottom: this.state.aspectRatio,
						position: "relative",
						margin: "50px 0",
					}}
				>
					<ReactPlayer
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
							}
						}}
					/>
				</div>
			</PlayerWrapper>
		);
	};
}
