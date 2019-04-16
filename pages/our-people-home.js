import Link from "next/link"
import {withRouter} from "next/router"
import React, {Component} from "react";

import Card, {cards} from "../components/card";
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

    return (
      <DefaultLayout>
        <ContentWrapper>
          { pageData.ourWorkRels &&
            <Grid
              cells={cards(pageData.ourWorkRels)}
            />
          }
        </ContentWrapper>
      </DefaultLayout>
    );
  }
}

export default withRouter(OurPeopleHome);
