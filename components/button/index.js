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

  ${props => (
    props.align === "center"
      ? `${css`
        display: block;
        margin: 0 auto;
      `}`
      : ""
  )};
`;

/**
 * =Button (component)
******************************/

export default function (props = {}) {
  let defaultOpts = {
    type: "cta",
    text: false,
    align: false
  };

  let {
    handleClick,
    activeClass,
    options = defaultOpts
  } = props;

  return (
    <Button_Styled
      onClick={handleClick}
      align={options.align}
    >

      {
        options.type === "cta"
        && (
          <CTA options={{
            type: "text",
            text: options.text
          }} />
        )
      }

      {
        options.type === "hmbgr"
        && <Hmbgr activeClass={activeClass} />
      }

    </Button_Styled>
  );
}
