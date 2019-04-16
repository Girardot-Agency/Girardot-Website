import Link from "next/link";
import React, {Component} from "react";
import styled from "styled-components";

import Markdown from "markdown-to-jsx";
import Modal from "react-modal";

import {
  $_Hidden,
  $_Flex,
  $_TransAll,
  $_BaseUnit
} from "../assets/styles/mixins.css";
import {
  BASE,
  COL,
  SCREEN,
  TYPE
} from "../assets/styles/theme.css";

import exportMap from "../static/db/export-map.json";

/**
 * =Card
************************************************************/

/**
 * =Card:styles
******************************/

const Profile_SC = styled.section`
  text-align: center;
`;

const ProfileImg_SC = styled.img`
  margin: 0 auto;
  width: ${$_BaseUnit(10)};
    max-width: 100%;
`;

const ProfileTitle_SC = styled.h2`
  color: ${COL.brand_main_base};
  cursor: pointer;
  display: inline-block;
  font-size: ${TYPE.md};
    font-weight: normal;
  margin-top: ${$_BaseUnit(1.5)};

  ${$_TransAll};

  &:hover {
    color: ${COL.brand_main_darkest};
  }
`;

const ProfilePosition_SC = styled.p`
  font-size: ${TYPE.md};
  color: ${COL.grey_base};
`;

const ProfileModalInner_SC = styled.div`
  /* margin-top: ${$_BaseUnit(2)}; */
`;

const ProfileModalTitle_SC = styled.h2`
  color: ${COL.brand_main_base};
  font-size: ${TYPE.md};
    font-weight: normal;
`;

const ProfileModalCopy_SC = styled.div`
  line-height: 1.5;

  & p {
    margin-top: 1em;
  }
`;

const ProfileModalClose_SC = styled.button`
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: ${$_BaseUnit()};
    right: ${$_BaseUnit()};

  & svg {
    width: ${$_BaseUnit(2)};
      height: ${$_BaseUnit(2)};
  }

  & .Close-x {
    fill: transparent;
    stroke: ${COL.brand_main_base};
      stroke-linecap: round;
      stroke-width: 5;

    ${$_TransAll};
  }

  &:hover .Close-x {
    stroke: ${COL.brand_main_darkest};
  }
`;


Modal.setAppElement("#__next");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .5)"
  },
  content : {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    maxWidth: "95%"
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
  }

  handleOpenModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  handleCloseModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    const activeClass = this.state.activeClass;

    return (
      <Profile_SC>

        <ProfileImg_SC
          src={this.props.profileImage}
          alt={this.props.title}
        />

        <ProfileTitle_SC
          onClick={this.handleOpenModal.bind(this)}
        >
          {this.props.title}
        </ProfileTitle_SC>

        <ProfilePosition_SC>
          {this.props.position}
        </ProfilePosition_SC>

        <Modal
          isOpen={this.state.modalIsOpen}
          closeTimeoutMS={400}
          style={customStyles}
        >
          <ProfileModalInner_SC>
            <ProfileModalClose_SC onClick={this.handleCloseModal.bind(this)}>
              <svg viewBox="0 0 40 40">
                <path className="Close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
              </svg>
            </ProfileModalClose_SC>

            <ProfileModalTitle_SC>
              {this.props.title}
            </ProfileModalTitle_SC>

            <ProfilePosition_SC>
              {this.props.position}
            </ProfilePosition_SC>

            <ProfileModalCopy_SC>
              <Markdown children={this.props.biog} />
            </ProfileModalCopy_SC>

          </ProfileModalInner_SC>
        </Modal>

      </Profile_SC>
    );
  }
}

/**
 * =Cards
************************************************************/

export function profiles (data) {
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
