import Link from "next/link"
import {withRouter} from "next/router"
import Markdown from "markdown-to-jsx";
import React, {Component} from "react";
import styled from "styled-components";

import ContentWrapper from "../components/content-wrapper";
import DefaultLayout from "../layouts/default";
import SectionTitle from "../components/section-title";

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
 * =Testimonial
************************************************************/

const TestimonialHeader_SC = styled.div``;
const TestimonialBody_SC = styled.div``;
const TestimonialFooter_SC = styled.div``;

function Testimonial (props = {}) {
  const {
    brandLogo,
    body,
    name,
    position,
    brand
  } = props;

  return (
    <section>
      <TestimonialHeader_SC>
        <img
          src={brandLogo}
          alt={brand}
        />
      </TestimonialHeader_SC>

      <TestimonialBody_SC>
        <Markdown children={body} />
      </TestimonialBody_SC>

      <TestimonialFooter_SC>
        <h2>{name}</h2>
        <p>{position}</p>
        <p>{brand}</p>
      </TestimonialFooter_SC>
    </section>
  )
}

/**
 * =Testimonials (page)
************************************************************/

const Header_SC = styled.div`
  margin-top: ${$_BaseUnit(5)};
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

          {/* { pageData.ourPeopleRels &&
            <Grid
              cells={profiles(pageData.ourPeopleRels)}
            />
          } */}
        </ContentWrapper>
      </DefaultLayout>
    );
  }
}

export default withRouter(TestimonialsHome);
