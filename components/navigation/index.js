/**
 * =Navigation
************************************************************/

import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";
import React, {Component} from "react";

// Component parts
import Menu from "./menu";
import Navbar from "./navbar";

/**
 * =Navigation
************************************************************/

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      activeClass: ""
    };
  }

  targetElement = null;

  componentDidMount() {
    this.targetElement = document.querySelector("#Menu");
  }

  handleClick() {
    if (!this.state.active) {
      disableBodyScroll(this.targetElement, {reserveScrollBarGap: true});
    } else {
      enableBodyScroll(this.targetElement);
    }
    this.setState({
      active: !this.state.active,
      activeClass: this.state.active
        ? "is-inactive"
        : "is-active"
    });
  }

  render() {
    const activeClass = this.state.activeClass;

    return (
      <nav>

        <Navbar
          handleClick={this.handleClick.bind(this)}
          activeClass={activeClass}
        />

        <Menu
          handleClick={this.handleClick.bind(this)}
          activeClass={activeClass}
          style={{transform: "translateY(-100%)"}}
        />

      </nav>
    );
  }
}

export default Navigation;
