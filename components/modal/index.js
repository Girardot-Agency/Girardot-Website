/**
 * =Modal
************************************************************/

import Modal from "react-modal";

Modal.setAppElement("#__next");

const customStyles = {
  overlay: {
	backgroundColor: "rgba(0, 0, 0, .85)",
	zIndex: "1000"
  },
  content : {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
	maxWidth: "95%",
	zIndex: "1000"
  }
};

export default function (props = {}) {
  let {
    modalIsOpen,
    children
  } = props;

  return (
    <Modal
      isOpen={modalIsOpen}
      closeTimeoutMS={400}
      style={customStyles}
    >
      {children}
    </Modal>
  );
}
