import Link from "next/link"
import {withRouter} from "next/router"
import React, {Component} from "react";

import Profile, {profiles} from "../components/profile";
import ContentWrapper from "../components/content-wrapper";
import DefaultLayout from "../layouts/default";
import Grid from "../components/grid";

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

    // console.log(pageData.ourPeopleRels)

    return (
      <DefaultLayout>
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
