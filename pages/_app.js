import React from "react";
import App, { Container } from "next/app";
import { PageTransition } from "next-page-transitions";

import styled, {createGlobalStyle} from "styled-components";

import CustomHead from "../components/head";
import Navigation from "../components/navigation";

import GlobalStyles from "../assets/styles/global.css";
import ResetStyles from "../assets/styles/reset.css";

/**
 * =Page transition
************************************************************/

const PageTransitionStyles = createGlobalStyle`
  .PageTran-enter {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }

  .PageTran-enter-done {
    opacity: 1;
  }

  .PageTran-enter-active {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: ease-in-out all 600ms;
  }

  .PageTran-exit-active {
    opacity: 0;
    transition: ease-in-out all 600ms;
  }
`;

/**
 * =APP
************************************************************/

export default class Girardot extends App {
  static async getInitialProps ({Component, ctx}) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {pageProps};
  }

  render () {
    const {Component, pageProps, router} = this.props;

    return (
      <Container>
        <Navigation />

        {/* Main content */}
        <PageTransition
          classNames="PageTran"
          loadingDelay={100}
          monkeyPatchScrolling={true}
          skipInitialTransition
          timeout={650}
        >

          <Component
            {...pageProps}
            key={router.route}
          />

        </PageTransition>

        {/* Styles */}
        <ResetStyles />
        <GlobalStyles />
        <PageTransitionStyles />
      </Container>
    );
  }
}
