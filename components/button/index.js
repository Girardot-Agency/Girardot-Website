/**
 * =Button
************************************************************/

import styled, {css} from "styled-components";

// External parts
import CTA from "../cta";

// Internal parts
import Hmbgr from "./hmbgr";

/**
 * =Styles
******************************/

const Button_Styled = styled.button`
  cursor: pointer;

  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;

  background: transparent;
  outline: none;

  color: inherit;
  font: inherit;

  line-height: normal;

  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  -webkit-appearance: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  &.Button--center {
    display: block;
    margin: 0 auto;
  }
`;

/**
 * =Button (component)
******************************/

export default function (props = {}) {
  let defaultOptions = {
    align: false,
    shrink: false,
    style: "primary",
    text: false,
    type: "cta",
  };

  let {
    handleClick,
    activeClass,
    options
  } = props;

  options = Object.assign({}, defaultOptions, options);  

  return (
    <Button_Styled
      className={`Button--${options.align}`}
      onClick={handleClick}
    >

      { options.type === "cta"
        && (
          <CTA
            options={{
              shrink: options.shrink,
              style: options.style,
              text: options.text,
              type: "text",
            }}
          />
        )
      }

      { options.type === "hmbgr"
        && <Hmbgr activeClass={activeClass} />
      }

    </Button_Styled>
  );
}
