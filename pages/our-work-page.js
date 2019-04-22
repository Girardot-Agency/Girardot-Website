import {withRouter} from "next/router"
import React, {Component} from "react";

import Fade from "react-reveal/Fade";
import {StickyContainer, Sticky} from "react-sticky";
import styled, {css} from "styled-components";

import Copy from "../components/copy";
import DefaultLayout from "../layouts/default";

import {transformImage} from "../lib/helpers";
import {_baseUnit, _contentWrapper, _screen, _flex} from "../assets/styles/mixins/_style";
import {SCREEN} from "../assets/styles/theme/_style";

/**
 * =Content
************************************************************/

const Content_Styled = styled.section`
  ${_contentWrapper()};
  ${_flex("row")};

  position: relative;
  margin-top: ${_baseUnit(2)};

  &::before {
    content: "";
    display: block;

    flex-basis: 100%;
    ${_screen({
      lg: css`
        flex-basis: 50%;
      `
    })}
  }

  .Content_inner {
    flex-basis: 100%;
    margin-top: ${_baseUnit(2)};
    margin-bottom: ${_baseUnit(5)};

    ${_screen({
      lg: css`
        flex-basis: calc(50% - ${_baseUnit(2)});
        margin-top: ${_baseUnit(4)};
        padding-left: ${_baseUnit(2)};
      `
    })};
  }
`;

function Content ({children}) {
  return (
    <Content_Styled>
      <div className="Content_inner">
        {children}
      </div>
    </Content_Styled>
  );
}

/**
 * =BannerImg
************************************************************/

const Banner_Styled = styled.div`
  ${_screen({
    lg: css`
      max-width: 50vw;
      padding-top: ${_baseUnit(4.5)};
      position: absolute;
        top: 0;
        left: 0;
      width: 50vw;
    `
  })};

  .Banner_image {
    & img {
      max-width: 100%;
    }
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
          <Banner_Styled style={isSticky ? style : {}}>
            <Fade left duration={600}>

              <div className="Banner_image">
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
              </div>

            </Fade>
          </Banner_Styled>
        );
      }}
    </Sticky>
  );
}

/**
 * =Container
************************************************************/

const Container_Styled = styled(StickyContainer)`
  padding-top: ${_baseUnit(4.5)};
  min-height: 100vh;
`;

function Container ({children}) {
  return (
    <Container_Styled>
      {children}
    </Container_Styled>
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
              copy={pageData.body}
              options={{
                title: pageData.title,
                gallery: pageData.gallery
              }}
            />

          </Content>
        </Container>
      </DefaultLayout>
    );
  }
}

export default withRouter(OurWorkPage);
