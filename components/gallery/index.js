/**
 * =Gallery
 ************************************************************/

import react, { Component } from "react";
import Lightbox from "react-image-lightbox";
import styled from "styled-components";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

// External parts
import Button from "../button";

// Internal parts
import GalleryStyle from "./gallery.style";

// Mixins/Themes etc
import { PUBLIC } from "../../lib/_config";
import { _transition } from "../../assets/styles/mixins/_style";

/**
 * =Styles
 ******************************/

const FeaturedImage_Styled = styled.img`
	${_transition()};

	cursor: pointer;
	opacity: 1;

	&:hover {
		opacity: 0.75;
	}
`;

/**
 * =Component
 ******************************/

export default class Gallery extends Component {
	constructor(props) {
		super(props);

		this.state = {
			photoIndex: 0,
			isOpen: false
		};
	}

	targetElement = null;
	componentDidMount() {
		this.targetElement = document.querySelector("#Gallery");
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

	render() {
		const { photoIndex, isOpen } = this.state;

		return (
			<div>
				<Button
					handleClick={this.handleClick.bind(this)}
					options={{
						type: "cta",
						text: "View gallery"
					}}
				/>

				<FeaturedImage_Styled
					onClick={this.handleClick.bind(this)}
					src={`${PUBLIC.path}${this.props.images[0]}`}
				/>

				{isOpen && (
					<Lightbox
						id={ "Gallery" }
						mainSrc={`${PUBLIC.path}${
							this.props.images[photoIndex]
						}`}
						nextSrc={`${PUBLIC.path}${
							this.props.images[
								(photoIndex + 1) % this.props.images.length
							]
						}`}
						prevSrc={`${PUBLIC.path}${
							this.props.images[
								(photoIndex + this.props.images.length - 1) %
									this.props.images.length
							]
						}`}
						onCloseRequest={this.handleClick.bind(this)}
						onMovePrevRequest={() =>
							this.setState({
								photoIndex:
									(photoIndex +
										this.props.images.length -
										1) %
									this.props.images.length
							})
						}
						onMoveNextRequest={() =>
							this.setState({
								photoIndex:
									(photoIndex + 1) % this.props.images.length
							})
						}
					/>
				)}

				<GalleryStyle />
			</div>
		);
	}
}
