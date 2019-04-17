/**
 * =Our people
************************************************************/

import {withRouter} from "next/router"
import React, {Component} from "react";

// External parts
import ContentWrapper from "../components/content-wrapper";
import DefaultLayout from "../layouts/default";
import Grid from "../components/grid";
import Profile, {profiles} from "../components/profile";
import SectionTitle from "../components/section-title";

/**
 * =Component
******************************/

class OurPeopleHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: props.router.query
    }
  }

  render() {
    const pageData = this.state.pageData;

    return (
      <DefaultLayout>
        <header>
          <SectionTitle
            title={pageData.title}
            isHeader={true}
          />
        </header>

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
