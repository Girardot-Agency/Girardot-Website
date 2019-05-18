import React, {Component} from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";

/**
 * =Player wrapper
************************************************************/

const PlayerWrapper_Styled = styled.div`
	&.isActive {
		position: fixed;
		width: 50rem;
		/* height: 100%; */
		top: 0;
		left: 0;
		z-index: 1000;
		background-color: rgba(0, 0, 0, .85);

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
			{children}
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
				<button
					onClick={this.handleClick.bind(this)}
					style={{
						position: "absolute",
						zIndex: "1"
					}}
				>
					Click me!
				</button>

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
					/>
				</div>
			</PlayerWrapper>
		);
	};
}
