/**
 * =Button
************************************************************/

import styled from "styled-components";

// External parts
import CTA from "../cta";

// Internal parts
import Hmbgr from "./hmbgr";

/**
 * =Styles
******************************/

const Button_Styled = styled.button`
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

export default function (props = {}) {
  const defaultOpts = {
    type: "cta",
    text: false
  }

  const {
    handleClick,
    activeClass,
    options = defaultOpts
  } = props;

  return (
    <Button_Styled onClick={handleClick}>

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
