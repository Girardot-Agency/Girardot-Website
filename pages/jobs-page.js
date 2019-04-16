import Markdown from "markdown-to-jsx";
import React, {Component} from "react";
import {withRouter} from "next/router"
import styled, {css} from "styled-components";

import ContentWrapper from "../components/content-wrapper";
import DefaultLayout from "../layouts/default";

import {
  $_Flex,
  $_BaseUnit,
  $_Screen
} from "../assets/styles/mixins.css";

import {
  COL,
  TYPE
} from "../assets/styles/theme.css.js"

const JobsInner_SC = styled.div`
  line-height: 1.5;
  margin: ${$_BaseUnit(10)} auto;
  width: ${$_BaseUnit(50)};
    max-width: 100%;

  h1, h2, h3, h4, h5, h6, p, ul, ol {
    margin-bottom: ${TYPE.scale.sm};

    &:nth-child(1n +2 ) {
      margin-top: 1em;
    }
  }

  h2 {
    color: ${COL.brand_main_base};
    font-size: ${TYPE.scale.md};
      font-weight: normal;
  }

  ul {
    list-style: square;
    padding-left: ${$_BaseUnit(2.5)};
  }
`;

class JobPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: props.router.query
    }
  }

  render () {
    const {router} = this.props;
    const pageData = this.state.pageData;
    console.log(pageData);

    return (
      <DefaultLayout>
        <ContentWrapper>
          <JobsInner_SC>
            <Markdown children={pageData.body} />
          </JobsInner_SC>
        </ContentWrapper>
      </DefaultLayout>
    )
  }
}

export default withRouter(JobPage);
