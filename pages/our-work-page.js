import {withRouter} from "next/router"
import React, {Component} from "react";

import Fade from "react-reveal/Fade";
import {StickyContainer, Sticky} from "react-sticky";
import styled, {css} from "styled-components";

import Copy from "../components/copy";
import DefaultLayout from "../layouts/default";

import {transformImage} from "../lib/helpers";
import {
  $_BaseUnit,
  $_ContentWrapper,
  $_Screen,
  $_Flex,
  $_PseudoBase
} from "../assets/styles/mixins.css";
import {
  SCREEN,
  TYPE
} from "../assets/styles/theme.css";

/**
 * =Content
************************************************************/

/**
 * =Content:styles
******************************/

const Content_SC = styled.section`
  ${$_ContentWrapper};
  ${$_Flex("row")};

  font-size: ${TYPE.scale.sm};
  position: relative;
  margin-top: ${$_BaseUnit(2)};

  &::before {
    ${$_PseudoBase};

    flex-basis: 100%;
    ${$_Screen({
      lg: css`
        flex-basis: 50%;
      `
    })}
  }
`;

const ContentInner_SC = styled.div`
  flex-basis: 100%;
  margin-top: ${$_BaseUnit(2)};
  margin-bottom: ${$_BaseUnit(5)};

  ${$_Screen({
    lg: css`
      flex-basis: calc(50% - ${$_BaseUnit(2)});
      margin-top: ${$_BaseUnit(4)};
      padding-left: ${$_BaseUnit(2)};
    `
  })};
`;

/**
 * =Content:component
******************************/

function Content ({children}) {
  return (
    <Content_SC>
      <ContentInner_SC>
        {children}
      </ContentInner_SC>
    </Content_SC>
  );
}

/**
 * =BannerImg
************************************************************/

/**
 * =BannerImg:styles
******************************/

const Banner_SC = styled.div`

  ${$_Screen({
    lg: css`
      max-width: 50vw;
      padding-top: ${$_BaseUnit(4.5)};
      position: absolute;
        top: 0;
        left: 0;
      width: 50vw;
    `
  })};
`;

const BannerImg_SC = styled.div`
  & img {
    max-width: 100%;
    /* z-index: -1; */
  }
`;

/**
 * =BannerImg:component
******************************/

function Banner ({isSticky, src, alt}) {
  return (
    <Sticky disableCompensation={true}>
      {({style}) => {
        return (
          <Banner_SC style={isSticky ? style : {}}>
            <Fade left duration={600}>
              <BannerImg_SC>
                <picture>
                  <source
                    media={`${SCREEN.lg}`}
                    sizes={"50vw"}
                    srcSet={`
                      ${transformImage(src, {w: 600})} 600w,
                      ${transformImage(src, {w: 800})} 800w,
                      ${transformImage(src, {w: 1000})} 1000w,
                      ${transformImage(src, {w: 1400})} 1400w,
                      ${transformImage(src, {w: 1800})} 1800w
                    `}
                  />
                  <source
                    sizes={"100vw"}
                    srcSet={`
                      ${transformImage(src, {w: 400})} 400w,
                      ${transformImage(src, {w: 600})} 600w,
                      ${transformImage(src, {w: 800})} 800w,
                      ${transformImage(src, {w: 1000})} 1000w,
                      ${transformImage(src, {w: 1200})} 1200w
                    `}
                  />
                  <img src={transformImage(src)} alt={alt} />
                </picture>
              </BannerImg_SC>
            </Fade>
          </Banner_SC>
        );
      }}
    </Sticky>
  );
}

/**
 * =Gallery
************************************************************/



/**
 * =Container
************************************************************/

const Container_SC = styled(StickyContainer)`
  padding-top: ${$_BaseUnit(4.5)};
  min-height: 100vh;
`;

function Container ({children}) {
  return (
    <Container_SC>
      {children}
    </Container_SC>
  );
}

/**
 * =OurWorkPage
************************************************************/

function setSticky (state) {
  if (window.matchMedia(SCREEN.lg).matches) {
    return state.setState({isSticky: true});
  }
  return state.setState({isSticky: false});
}

class OurWorkPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageData: props.router.query,
      isSticky: "",
    };
  }

  componentDidMount() {
    setSticky(this);
    window.addEventListener("resize", (e) => setSticky(this));
  }

  render() {
    const {router} = this.props;
    const pageData = this.state.pageData;

    return (
      <DefaultLayout>
        <Container>

          <Banner
            isSticky={this.state.isSticky}
            src={pageData.bannerImage}
            alt={pageData.title}
          />

          <Content>

            <Copy
              title={pageData.title}
              copy={pageData.body}
              gallery={pageData.gallery}
            />

          </Content>
        </Container>
      </DefaultLayout>
    );
  }
}

export default withRouter(OurWorkPage);
