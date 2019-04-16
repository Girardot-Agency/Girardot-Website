import Markdown from "markdown-to-jsx";
import react, {Component} from "react";
import ReactPlayer from "react-player";
import styled, {css} from "styled-components";

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import {
  $_BaseUnit
} from "../assets/styles/mixins.css";
import {
  TYPE
} from "../assets/styles/theme.css";

/**
 * =Player
************************************************************/

const Player_SC = styled(Player)`
  margin: ${$_BaseUnit(2)} 0;
  width: 100% !important;
    height: 100% !important;
`;

function Player (props = {}) {
  const {
    url = "",
    ar = "56.25%"
  } = props;

  return (
    <div
      style={{
        paddingBottom: ar,
        position: "relative",
        margin: "50px 0"
      }}>
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
        }}
      />
    </div>
  )
}

/**
 * =Gallery
************************************************************/

// Modal.setAppElement("#__next");

// const customStyles = {
//   overlay: {
//     backgroundColor: "rgba(0, 0, 0, .5)"
//   },
//   content : {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//     maxHeight: "95%",
//     maxWidth: "95%",
//     zIndex: "9999"
//   }
// };

// class ImageModal extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       modalIsOpen: false
//     };
//   }

//   handleOpenModal() {
//     this.setState({
//       modalIsOpen: true
//     });
//   }

//   handleCloseModal() {
//     this.setState({
//       modalIsOpen: false
//     });
//   }

//   render() {
//     return (<>
//       <img
//         onClick={this.handleOpenModal.bind(this)}
//         src={this.props.image}
//       />

//       <Modal
//         isOpen={this.state.modalIsOpen}
//         closeTimeoutMS={400}
//         style={customStyles}
//       >
//         <img
//           src={this.props.image}
//         />
//       </Modal>
//     </>)
//   }
// }


class Gallery extends Component {
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

/**
 * =Copy
************************************************************/

const Copy_SC = styled.div`
  font-family: "apercu", sans-serif;

  margin: 0 auto;
  width: 100%;
    max-width: ${$_BaseUnit(40)};

  h1 {
    font-size: ${TYPE.scale.xl};
    margin-bottom: ${$_BaseUnit(5)};
  }

  h2 {
    font-size: ${TYPE.scale.lg};
  }

  h2, h3, h4, h5, h6, p, img {
    margin-top: ${$_BaseUnit(2.5)};
    margin-bottom: ${$_BaseUnit(2.5)};
  }

  img, iframe {
    max-width: 100%;
  }
`;

function Copy ({title, copy, gallery}) {
  return (
    <Copy_SC>

      { title
        && <h1>{title}</h1>
      }

      <Markdown
        children={copy}
        options={{
          overrides: {
            Player: {
                component: Player,
            },
          },
        }}
      />

      { Array.isArray(gallery) && gallery.length
        ? (
          // gallery.map((image, index) => {

          //   return (
          //     <ImageModal image={image} />
          //   )
          // })
          <Gallery images={gallery} />
        )
        : ""
      }
    </Copy_SC>
  );
}

export default Copy;
