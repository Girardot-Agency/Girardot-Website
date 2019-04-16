import Link from "next/link"
import {withRouter} from "next/router"
import Markdown from "markdown-to-jsx";
import React, {Component} from "react";
import styled, {css} from "styled-components";

import DefaultLayout from "../layouts/default";

import ContentWrapper from "../components/content-wrapper";
import Copy from "../components/copy";
import SectionTitle from "../components/section-title";

import exportMap from "../static/db/export-map.json";
import {
  $_Flex,
  $_BaseUnit,
  $_Link,
  $_Screen
} from "../assets/styles/mixins.css";
import {
  COL,
  TYPE
} from "../assets/styles/theme.css.js"

/**
 * =Testimonial
************************************************************/

const JobsInner_SC = styled.div`
  margin: 0 auto;
  text-align: center;
  width: ${$_BaseUnit(50)};
    max-width: 100%;
`;

const JobSummary_SC = styled.div`
  margin-bottom: ${$_BaseUnit(1.5)};
  padding-bottom: ${$_BaseUnit(1.5)};

  &:nth-last-child(1n + 2) {
    border-bottom: 1px solid ${COL.grey_lightest};
  }
`;

const JobSummaryLink_SC = styled.a`
  ${$_Link(COL.brand_main_base, COL.brand_main_dark)}

  font-size: ${TYPE.scale.md};
    font-weight: normal;
`;

function JobSumary ({pageData}) {
  const route = {
    pathname: pageData.page,
    query: pageData.query
  };

  return (
    <JobSummary_SC>
      <h2>
        <Link
          passHref
          href={route}
          as={pageData.query.path}
          prefetch>

          <JobSummaryLink_SC title={pageData.query.title}>
            {pageData.query.title}
          </JobSummaryLink_SC>
        </Link>
      </h2>
    </JobSummary_SC>
  );
}

/**
 * =Testimonials (page)
************************************************************/

const Header_SC = styled.div`
  margin-top: ${$_BaseUnit(5)};
`;

class JobsHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: props.router.query
    }
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
    const {router} = this.props;
    const pageData = this.state.pageData;

    return (
      <DefaultLayout>
        <Header_SC>
          <SectionTitle title={pageData.title} />
        </Header_SC>

        <ContentWrapper>
          <JobsInner_SC>

            { pageData.jobsRels &&
              pageData.jobsRels.map((rel, i) => {
              const relPageData = exportMap[rel];

              console.log(relPageData)

              if (relPageData && relPageData !== undefined) {

                return (
                  <JobSumary pageData={relPageData} />
                )
              }
            })}

          </JobsInner_SC>
        </ContentWrapper>
      </DefaultLayout>
    );
  }
}

export default withRouter(JobsHome);
