import styled, {css} from "styled-components";

import {
  BASE,
  COL
} from "../assets/styles/theme.css";

import {
  $_BaseUnit,
  $_Hidden,
  $_TransAll
} from "../assets/styles/mixins.css";


/**
 * =Hmbgr (hamburger icon)
************************************************************/

/**
 * =Hmbgr (styles)
******************************/

const Hmbgr_SC = styled.div`
  width: ${$_BaseUnit(1.75)};
  height: ${$_BaseUnit(1.25)};
  position: relative;
`;

const $_hmbgrIconShared = css`
  ${$_TransAll};

  background-color: ${COL.brand_main_base};
  position: absolute;

  width: 100%;
  height: ${$_BaseUnit(.25)};
  border-radius: 2px;
`;

const HmbgrIcon_SC = styled.div`
  ${$_hmbgrIconShared};

  top: calc(50% - ${$_BaseUnit(.25)});

  &::before {
    top: -7px;
  }
  &::after {
    bottom: -7px;
  }
  &::before,
  &::after {
    ${$_hmbgrIconShared};

    content: "";
    display: block;
  }

  /* Active state */
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
`;

const HmbgrAlt_SC = styled.div`
  ${$_Hidden}
`;

/**
 * =Hmbgr (component)
******************************/

function Hmbgr (props = {}) {
  const {activeClass, target} = props;

  return (
    <Hmbgr_SC>

      <HmbgrIcon_SC
        className={activeClass}
        aria-hidden="true" />

      <HmbgrAlt_SC>
        Open: {target}
      </HmbgrAlt_SC>

    </Hmbgr_SC>
  );
}

/**
 * =Button
************************************************************/

/**
 * =Button (styles)
******************************/

const Button_SC = styled.button`
  cursor: pointer;

  /**
   * =Button reset
   * See: https://gist.github.com/MoOx/9137295 */
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;
  outline: none;

  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;

  /* Normalize 'line-height'. Cannot be changed from 'normal' in Firefox 4+. */
  line-height: normal;

  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  /* Corrects inability to style clickable 'input' types in iOS */
  -webkit-appearance: none;

  /* Remove excess padding and border in Firefox 4+ */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;

/**
 * =Button (component)
******************************/

function Button ({handleClick, activeClass}) {
  return (
    <Button_SC onClick={handleClick}>
      <Hmbgr activeClass={activeClass} />
    </Button_SC>
  );
}

export default Button;
