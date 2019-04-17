/**
 * =Hmbgr (hamburger icon)
************************************************************/

import styled from "styled-components";

import {COL} from "../../assets/styles/theme/_style";
import {_baseUnit, _hidden, _transition} from "../../assets/styles/mixins/_style";

/**
 * =Styles
******************************/

const Hmbgr_Styled = styled.div`
  width: ${_baseUnit(1.75)};
  height: ${_baseUnit(1.25)};
  position: relative;

  .Hmbgr-icon,
  .Hmbgr-icon::before,
  .Hmbgr-icon::after {
    ${_transition()};

    background-color: ${COL.brand_main_base};
    position: absolute;

    width: 100%;
    height: ${_baseUnit(.25)};
    border-radius: 2px;
  }

  .Hmbgr-icon {
    top: calc(50% - ${_baseUnit(.25)});

    &::before,
    &::after {
      content: "";
      display: block;
    }

    &::before {
      top: -7px;
    }

    &::after {
      bottom: -7px;
    }

    &.is-active {
      background-color: transparent;

      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
      &::before,
      &::after {
        top: 50%;
      }
    }
  }

  .Hmbgr-alt {
    ${_hidden()}
  }
`;

/**
 * =Component
******************************/

function Hmbgr (props = {}) {
  const {activeClass, target} = props;

  return (
    <Hmbgr_Styled>

      <div
        className={`Hmbgr-icon ${activeClass}`}
        aria-hidden="true"
      ></div>

      <div className="Hmbgr-alt">
        Open: {target}
      </div>

    </Hmbgr_Styled>
  );
}

export default Hmbgr
