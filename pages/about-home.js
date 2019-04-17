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
        <picture>
          <source
            sizes={"100vw"}
            srcSet={`
              ${transformImage(src, {w: 400})} 400w,
              ${transformImage(src, {w: 600})} 600w,
              ${transformImage(src, {w: 800})} 800w,
              ${transformImage(src, {w: 1000})} 1000w,
              ${transformImage(src, {w: 1200})} 1200w
              ${transformImage(src, {w: 1800})} 1800w
            `}
          />
          <img src={transformImage(src)} alt={alt} />
        </picture>
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
  }

  render() {
    const {router} = this.props;

    // console.log(router);

    return (
      <DefaultLayout>
        <Header>
          <SectionTitle title={router.query.title} />
        </Header>

        <ContentWrapper>
          <Banner
            src={router.query.bannerImage}
            alt={router.query.title}
          />

          <Copy copy={router.query.body} />
        </ContentWrapper>
      </DefaultLayout>
    );
  }
}

export default withRouter(AboutHome);
