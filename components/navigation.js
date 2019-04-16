import React, {Component} from "react";
import Link from "next/link";
import styled, {css, keyframes} from "styled-components";
import Div100vh from "react-div-100vh";

import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";

import {slideInDown, slideOutUp} from "react-animations";

import Button from "./button";
import Logo from "./logo";

import {getPagesData} from "../lib/helpers";

import {
  COL,
  STRAP,
  TYPE
} from "../assets/styles/theme.css";

import {
  $_BaseUnit,
  $_ContentWrapper,
  $_Flex,
  $_Link,
  $_PosCenter,
  $_PseudoBase,
  $_Screen,
  $_Shadow,
  $_TransAll,
} from "../assets/styles/mixins.css";

/**
 * =Menu
************************************************************/

/**
 * =Menu (styles)
******************************/

const animateMenuDown = keyframes`${slideInDown}`;
const animateMenuUp = keyframes`${slideOutUp}`;

const Menu_SC = styled(Div100vh)`
  background-color: ${COL.brand_main_base};
  left: 0;
    top: 0;
  overflow-y: auto;
  position: fixed;
  transform: translateY(-100%);
  width: 100vw;
  z-index: 1;

  &.is-inactive {
    animation: .8s ${animateMenuUp};
  }

  &.is-active {
    animation: .8s ${animateMenuDown};
    transform: translateY(0);
  }
`;

const MenuInner_SC = styled(Div100vh)`
  ${$_Flex("columnCenterAll")};

  padding: ${$_BaseUnit(3)} 0;
  width: 100%;

  ${$_Screen({
    sm: css`padding: ${$_BaseUnit(4)} 0;`,
    lg: css`padding: ${$_BaseUnit(5)} 0;`
  })};

`;

const MenuList_SC = styled.ul`
  font-size: ${TYPE.scale.md};
  padding: 1em 0;
  position: relative;
  text-align: center;

  &::before,
  &::after {
    ${$_PseudoBase};
    ${$_PosCenter("x", "relative")};

    width: ${$_BaseUnit(3.5)};

  } &::before {
    border-top: ${$_BaseUnit(.25)} solid ${COL.white};
    padding-top: 1em;

  } &::after {
    border-bottom: ${$_BaseUnit(.25)} solid ${COL.white};
    padding-bottom: 1em;
  }
`;

const MenuItem_SC = styled.li`
  text-transform: uppercase;

  &:not(:last-child) {
    margin-bottom: .75em;
  }

  & > a {
    ${$_Link(COL.white, COL.white_opaque)};
  }
`;

/**
 * =Menu (component)
******************************/

/**
 * Pages API:
 * pages = Array
 * page.slug = String
 * page.data = Object
 * page.data.page = String -> page template
 * page.data.query = Object -> page content */

function Menu ({handleClick, activeClass}) {
  const indexPages = getPagesData(/^(?!\/index.html)(.*\/index.html)/);

  let listItems = [];

  indexPages.map((item, index) => {
    // const slug = item.slug.replace(/(\/index)?\.html$/, "");
    const title = item.data.query.title;

    const route = {
      pathname: item.data.page,
      query: item.data.query
    };

    listItems.push(
      <MenuItem_SC key={`page-${index}`}>
        <Link
          href={route}
          as={item.data.query.path}
        >
          <a onClick={handleClick}>{title}</a>
        </Link>
      </MenuItem_SC>
    );
  });

  return (
    <Menu_SC
      id="Menu"
      className={activeClass}
      style={{maxHeight: "100rvh"}}>

      <MenuInner_SC style={{minHeight: "100rvh"}}>
        <MenuList_SC>
          {listItems}
        </MenuList_SC>
      </MenuInner_SC>
    </Menu_SC>
  );
}

/**
 * =Navbar
************************************************************/

/**
 * =Navbar (styles)
******************************/

const Navigation_SC = styled.nav`
`;

const Navbar_SC = styled.div`
  ${$_Shadow};

  background: ${COL.white};
  height: ${$_BaseUnit(5)};
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 100;
`;

const NavbarInner_SC = styled.div`
  ${$_ContentWrapper};

  ${$_Flex("alignItemsCenter")};

  height: 100%;
`;

const NavbarLogo_SC = styled.div`
  ${$_PosCenter("x")}
`;

/**
 * =Navbar (component)
******************************/

function Navbar ({handleClick, activeClass}) {
  return (
    <Navbar_SC>
      <NavbarInner_SC>

        <Button
          handleClick={handleClick}
          activeClass={activeClass} />

        <NavbarLogo_SC>
          <Link
            passHref
            href={"/"}
            prefetch
          >
            <a>
              <Logo size="sm" logo="logoMain" />
            </a>
          </Link>
        </NavbarLogo_SC>

      </NavbarInner_SC>
    </Navbar_SC>
  );
}

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
      <Navigation_SC>

        <Navbar
          handleClick={this.handleClick.bind(this)}
          activeClass={activeClass} />

        <Menu
          handleClick={this.handleClick.bind(this)}
          activeClass={activeClass}
          style={"transform:translateY(-100%);"} />

      </Navigation_SC>
    );
  }
}

export default Navigation;
