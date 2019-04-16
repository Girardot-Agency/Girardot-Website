import Link from "next/link"
import {withRouter} from "next/router"
import React, {Component} from "react";
import styled from "styled-components";

import ContentWrapper from "../components/content-wrapper";
import DefaultLayout from "../layouts/default";
import Grid from "../components/grid";
import Profile, {profiles} from "../components/profile";
import SectionTitle from "../components/section-title";

import exportMap from "../static/db/export-map.json";
import {
  $_Flex,
  $_BaseUnit
} from "../assets/styles/mixins.css";
import {
  COL,
  TYPE
} from "../assets/styles/theme.css.js"

/**
 * =Our people
************************************************************/

const Header_SC = styled.div`
  margin-top: ${$_BaseUnit(5)};
`;

class OurPeopleHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: props.router.query
    }
  }

  handleClick() {
  }

  render() {
    const {router} = this.props;
    const pageData = this.state.pageData;

    return (
      <DefaultLayout>
        <Header_SC>
          <SectionTitle title={pageData.title} />
        </Header_SC>

        <ContentWrapper>
          { pageData.ourPeopleRels &&
            <Grid
              cells={profiles(pageData.ourPeopleRels)}
            />
          }
        </ContentWrapper>
      </DefaultLayout>
    );
  }
}

export default withRouter(OurPeopleHome);
