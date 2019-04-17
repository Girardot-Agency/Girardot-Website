/**
 * =Menu
************************************************************/

import Link from "next/link";
import {slideInDown, slideOutUp} from "react-animations";
import Div100vh from "react-div-100vh";
import styled, {css, keyframes} from "styled-components";


// Themes/mixins/helpers
import {_baseUnit, _flex, _hover, _center, _screen} from "../../assets/styles/mixins/_style";
import {COL, TYPE} from "../../assets/styles/theme/_style";
import {getPagesData} from "../../lib/helpers";

/**
 * =Styles
******************************/

const animateMenuDown = keyframes`${slideInDown}`;
const animateMenuUp = keyframes`${slideOutUp}`;

const Menu_Styled = styled(Div100vh)`
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

  .Menu-inner {
    ${_flex("columnCenterAll")};

    padding: ${_baseUnit(3)} 0;
    width: 100%;
    height: inherit;

    ${
      _screen({
        sm: css`padding: ${_baseUnit(4)} 0;`,
        lg: css`padding: ${_baseUnit(5)} 0;`
      })
    };
  }

  .Menu-list {
    font-size: ${TYPE.scale.md};
    padding: 1em 0;
    position: relative;
    text-align: center;

    &::before,
    &::after {
      ${_center("x", "relative")};

      content: "";
      display: block;
      width: ${_baseUnit(3.5)};

    } &::before {
      border-top: ${_baseUnit(.25)} solid ${COL.white};
      padding-top: 1em;

    } &::after {
      border-bottom: ${_baseUnit(.25)} solid ${COL.white};
      padding-bottom: 1em;
    }
  }

  .Menu-item {
    text-transform: uppercase;

    &:not(:last-child) {
      margin-bottom: .75em;
    }

    & > a {
      ${_hover(COL.white, COL.white_opaque)};
    }
  }
`;

/**
 * =Component
******************************/

function Menu ({handleClick, activeClass}) {
  const indexPages = getPagesData(/^(?!\/index.html)(.*\/index.html)/);

  let listItems = [(
    <li className="Menu-item" key={`page-home`}>
      <Link
        href="/"
      >
        <a onClick={handleClick}>Home</a>
      </Link>
    </li>
  )];

  indexPages.map((item, index) => {
    // const slug = item.slug.replace(/(\/index)?\.html$/, "");
    const title = item.data.query.title;

    const route = {
      pathname: item.data.page,
      query: item.data.query
    };

    listItems.push(
      <li className="Menu-item" key={`page-${index}`}>
        <Link
          href={route}
          as={item.data.query.path}
        >
          <a onClick={handleClick}>{title}</a>
        </Link>
      </li>
    );
  });

  return (
    <Menu_Styled
      id="Menu"
      className={activeClass}
      style={{height: "100rvh"}}
    >
      <div className="Menu-inner">
        <ul className="Menu-list">
          {listItems}
        </ul>
      </div>
    </Menu_Styled>
  );
}

export default Menu
