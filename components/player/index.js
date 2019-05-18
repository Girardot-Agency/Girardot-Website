import React, {Component} from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";

/**
 * =Player wrapper
************************************************************/

const PlayerWrapper_Styled = styled.div`
	&.isOpen {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1000;
		background-color: rgba(0, 0, 0, .85);

	}
`;

function PlayerWrapper ({children}) {
	return (
		<PlayerWrapper_Styled>
			{children}
		</PlayerWrapper_Styled>
	)
}

/**
 * =Player
************************************************************/

export default class Player extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<PlayerWrapper>
				<div
					style={{
						paddingBottom: this.props.ar ? this.props.ar : "56.25%",
						position: "relative",
						margin: "50px 0"
					}}
				>
					<ReactPlayer
						url={this.props.url}
						width="100%"
						height="100%"
						style={{
							position: "absolute",
							top: "0",
							left: "0"
						}}
					/>
				</div>
			</PlayerWrapper>
		);
	};
}
