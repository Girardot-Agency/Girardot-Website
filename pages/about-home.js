import Link from "next/link"
import {withRouter} from "next/router"
import React, {Component} from "react";
import styled, {css} from "styled-components";

import Copy from "../components/copy";
import ContentWrapper from "../components/content-wrapper";
import DefaultLayout from "../layouts/default";
import SectionTitle from "../components/section-title";

import {transformImage} from "../lib/helpers";
import {_baseUnit} from "../assets/styles/mixins/_style";

/**
 * =Title
************************************************************/

const Header = styled.header`
  margin-top: ${_baseUnit(5)};
`;

/**
 * =Banner
************************************************************/

const Banner_SC = styled.div`
  margin-bottom: ${_baseUnit(5)};
`;

const BannerImg_SC = styled.div`
  & img {
    max-width: 100%;
    /* z-index: -1; */
  }
`;

function Banner (props = {}) {
  const {src, alt} = props;

  return (
    <Banner_SC>
      <BannerImg_SC>
        <img src={transformImage(src)} alt={alt} />
        {/* <picture> */}
          {/* <source
            sizes={"100vw"}
            srcSet={`
              ${transformImage(src, {w: 400})} 400w,
              ${transformImage(src, {w: 600})} 600w,
              ${transformImage(src, {w: 800})} 800w,
              ${transformImage(src, {w: 1000})} 1000w,
              ${transformImage(src, {w: 1200})} 1200w
              ${transformImage(src, {w: 1800})} 1800w
            `}
          /> */}
        {/* </picture> */}
      </BannerImg_SC>
    </Banner_SC>
  );
}


/**
 * =AboutHome
************************************************************/

class AboutHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageData: props.router.query
    }
  }

  render() {
    const {router} = this.props;
    const pageData = this.state.pageData;

    return (
      <DefaultLayout>
        <Header>
          <SectionTitle title={pageData.title} />
        </Header>

        <ContentWrapper>
          <Banner
            src={pageData.bannerImage}
            alt={pageData.title}
          />

          <Copy copy={pageData.body} />
        </ContentWrapper>
      </DefaultLayout>
    );
  }
}

export default withRouter(AboutHome);
