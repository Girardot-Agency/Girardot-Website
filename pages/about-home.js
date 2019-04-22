import {withRouter} from "next/router"
import React, {Component} from "react";
import styled from "styled-components";

import Copy from "../components/copy";
import ContentWrapper from "../components/content-wrapper";
import DefaultLayout from "../layouts/default";
import SectionTitle from "../components/section-title";

import {transformImage} from "../lib/helpers";
import {_baseUnit} from "../assets/styles/mixins/_style";

/**
 * =Banner
************************************************************/

const Banner_Styled = styled.div`
  margin-bottom: ${_baseUnit(5)};

  .Banner_image {
    img {
      max-width: 100%;
    }
  }
`;

function Banner (props = {}) {
  const {src, alt} = props;

  return (
    <Banner_Styled>
      <div className="Banner_image">
        <picture>
          <source
            sizes={"100vw"}
            srcSet={`
              ${transformImage(src, {w: 600})} 400w,
              ${transformImage(src, {w: 800})} 600w,
              ${transformImage(src, {w: 1000})} 800w,
              ${transformImage(src, {w: 1200})} 1000w,
              ${transformImage(src, {w: 1400})} 1200w
              ${transformImage(src, {w: 2000})} 1800w
            `}
          />
          <img src={transformImage(src)} alt={alt} />
        </picture>
      </div>
    </Banner_Styled>
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
        <SectionTitle title={pageData.title} isHeader={true} />

        <ContentWrapper>
          <Banner
            src={pageData.bannerImage}
            alt={pageData.title}
          />

          <Copy
            copy={pageData.body}
            options={{copyStyle: "secondary"}}  
          />

        </ContentWrapper>
      </DefaultLayout>
    );
  }
}

export default withRouter(AboutHome);
