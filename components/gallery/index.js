/**
 * =Gallery
************************************************************/

import react, {Component} from "react";
import Lightbox from "react-image-lightbox";

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
    console.log(isOpen)

    return (

      <div>
        <button type="button" onClick={this.handleClick.bind(this)}>
          Open Lightbox
        </button>

        {isOpen && (
          <Lightbox
            mainSrc={this.props.images[photoIndex]}
            nextSrc={this.props.images[(photoIndex + 1) % this.props.images.length]}
            prevSrc={this.props.images[(photoIndex + this.props.images.length - 1) % this.props.images.length]}
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
      </div>
    );
  }
}
