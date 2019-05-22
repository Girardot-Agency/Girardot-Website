/**
 * =Gallery
************************************************************/

import react, {Component} from "react";
import Lightbox from "react-image-lightbox";
import styled from "styled-components";

// External parts
import Button from "../button";

// Internal parts
import GalleryStyle from "./gallery.style";

// Mixins/Themes etc
import { PUBLIC } from "../../lib/_config";
import {_transition} from "../../assets/styles/mixins/_style"

/**
 * =Styles
******************************/

const FeaturedImage_Styled = styled.img`
  ${_transition()};

  cursor: pointer;
  opacity: 1;

  &:hover {
    opacity: .75;
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
      isOpen: false,
    };
  }

  handleClick() {
    this.setState({ isOpen: true })
  }

  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div>
		{/* <h2>Image gallery</h2> */}

		<Button
          handleClick={this.handleClick.bind(this)}
          options={{
            type: "cta",
            text: "View gallery"
          }}
        />

        <FeaturedImage_Styled
          onClick={this.handleClick.bind(this)}
          src={`${PUBLIC.path}${this.props.images[0]}`} />

        {isOpen && (
          <Lightbox
            mainSrc={`${PUBLIC.path}${this.props.images[photoIndex]}`}
            nextSrc={`${PUBLIC.path}${this.props.images[(photoIndex + 1) % this.props.images.length]}`}
            prevSrc={`${PUBLIC.path}${this.props.images[(photoIndex + this.props.images.length - 1) % this.props.images.length]}`}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + this.props.images.length - 1) % this.props.images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % this.props.images.length,
              })
            }
          />
        )}

        <GalleryStyle />
      </div>
    );
  }
}
