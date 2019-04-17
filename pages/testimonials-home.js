import Link from "next/link"
import {withRouter} from "next/router"
import Markdown from "markdown-to-jsx";
import React, {Component} from "react";
import Modal from "react-modal";
import styled, {css} from "styled-components";

import DefaultLayout from "../layouts/default";

import ContentWrapper from "../components/content-wrapper";
import Copy from "../components/copy";
import SectionTitle from "../components/section-title";

import exportMap from "../static/db/export-map.json";
import {_flex, _baseUnit, _screen} from "../assets/styles/mixins/_style";
import {COL, TYPE} from "../assets/styles/theme/_style"

/**
 * =Testimonial
************************************************************/

const Testimonials_SC = styled.div`
  ${_flex("row")}

  margin: -${_baseUnit(2.5)} 0 0 -${_baseUnit(2.5)};

  ${_screen({
    xl: css`
      margin: -${_baseUnit(5)} 0 0 -${_baseUnit(5)};
    `
  })};
`;

const Testimonial_SC = styled.section`
  margin: ${_baseUnit(2.5)} 0 0 ${_baseUnit(2.5)};
  flex-basis: 100%;

  ${_screen({
    sm: css`
      flex-basis: calc(50% - ${_baseUnit(2.5)});
    `,
    md: css`
      flex-basis: calc(50% - ${_baseUnit(2.5)});
    `,
    lg: css`
      flex-basis: calc(33.3333% - ${_baseUnit(2.5)});
    `,
    xl: css`
      flex-basis: calc(25% - ${_baseUnit(5)});
      margin: ${_baseUnit(5)} 0 0 ${_baseUnit(5)};
    `
  })};
`;

const TestimonialHeader_SC = styled.div`
  display: flex;
  height: ${_baseUnit(7.5)};
  margin-bottom: ${_baseUnit(2.5)};

  & img {
    margin: auto 0;
    max-width: ${_baseUnit(12.5)};
  }
`;

const TestimonialBody_SC = styled.div``;

const TestimonialFooter_SC = styled.div`

  & > h2 {
    color: ${COL.brand_main_base};
    font-size: ${TYPE.scale.md};
      font-weight: normal;
  }

  & > p {
    color: ${COL.grey_base};
    font-size: ${TYPE.scale.xs};
  }
`;

function Testimonial (props = {}) {
  const {
    brandLogo,
    body,
    name,
    position,
    brand
  } = props;

  return (
    <Testimonial_SC>
      <TestimonialHeader_SC>
        <img
          src={brandLogo}
          alt={brand}
        />
      </TestimonialHeader_SC>

      <TestimonialBody_SC>
        <Copy copy={body} />
      </TestimonialBody_SC>

      <TestimonialFooter_SC>
        <h2>{name}</h2>
        <p>{position}</p>
        <p>{brand}</p>
      </TestimonialFooter_SC>
    </Testimonial_SC>
  )
}

/**
 * =Testimonials (page)
************************************************************/

const Header_SC = styled.div`
  margin-top: ${_baseUnit(5)};
`;

class TestimonialsHome extends Component {
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
          <Testimonials_SC>

            { pageData.testimonialsRels &&
              pageData.testimonialsRels.map((rel, i) => {
              const relPageData = exportMap[rel];

              if (relPageData && relPageData !== undefined) {

                return (
                  <Testimonial
                    key={`testimonial-${i}`}
                    brandLogo={relPageData.query.brandLogo}
                    body={relPageData.query.body}
                    name={relPageData.query.title}
                    position={relPageData.query.position}
                    brand={relPageData.query.brand}
                  />
                )
              }
            })}

          </Testimonials_SC>
        </ContentWrapper>
      </DefaultLayout>
    );
  }
}

export default withRouter(TestimonialsHome);
