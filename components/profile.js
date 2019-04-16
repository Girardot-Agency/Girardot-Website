import Link from "next/link";
import React, {Component} from "react";
import styled from "styled-components";

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
  margin-top: ${$_BaseUnit(2)};

  ${$_TransAll};

  &:hover {
    color: ${COL.brand_main_darkest};
  }
`;

const ProfilePosition_SC = styled.p`
`;

const ProfileModal_SC = styled.div`
  background-color: rgba(0, 0, 0, 1);
  position: fixed;
  top: 0;
  left: 0;

  &.is-active {
    background-color: pink;
  }

  & > div {

  }
`;


/**
 * =Card:component
******************************/

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      activeClass: ""
    };
  }

  handleClick() {
    this.setState({
      active: !this.state.active,
      activeClass: this.state.active
        ? "is-inactive"
        : "is-active"
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
          onClick={this.handleClick.bind(this)}
        >
          {this.props.title}
        </ProfileTitle_SC>

        <ProfilePosition_SC>
          {this.props.position}
        </ProfilePosition_SC>

        <ProfileModal_SC
          className={activeClass}
        >
          {this.props.biog}
        </ProfileModal_SC>

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

    console.log(relPageData);

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
