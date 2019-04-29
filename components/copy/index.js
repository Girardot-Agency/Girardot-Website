/**
 * =Copy
************************************************************/

import Markdown from "markdown-to-jsx";
import styled from "styled-components";

import Gallery from "../gallery";
import Player from "../player";

// Theme/helpers/mixins
import {_baseUnit} from "../../assets/styles/mixins/_style";
import {COL, TYPE} from "../../assets/styles/theme/_style";

/**
 * =Styles
******************************/

const Copy_Styled = styled.div`
  line-height: 1.5;
  margin: 0 auto;
  width: 100%;
    max-width: ${_baseUnit(40)};

  h1 {
    font-size: ${TYPE.scale.xl};
    margin-bottom: ${_baseUnit(5)};
  }

  h2 {
    font-size: ${TYPE.scale.lg};
  }

  h2, h3, h4, h5, h6, p, img {
    margin-top: ${_baseUnit(2.5)};
    margin-bottom: ${_baseUnit(2.5)};
  }

  img, iframe {
    max-width: 100%;
  }

  img {
	box-shadow: 1px 4px 11px -3px rgba(0, 0, 0, 0.35);
  }

  ul {
    list-style: square;
    padding-left: ${_baseUnit(2.5)};
  }

  &.Copy--secondary {
    h1, h2, h3, h4, h5 {
      color: ${COL.brand_main_base};
    }
  }
`;

/**
 * =Component
******************************/

export default function (props = {}) {
  let defaultOptions = {
    copyStyle: "primary",
    gallery: false,
    title: false
  };

  let {
    copy,
    options = defaultOptions,
  } = props;

  let markdownOpts = {
    overrides: {
      Player: {
        component: Player
      }
    }
  };

  return (
    <Copy_Styled className={`Copy--${options.copyStyle}`}>

      { options.title
        && <h1>{options.title}</h1>
      }

      <Markdown
        children={copy}
        options={markdownOpts}
      />

      {
        Array.isArray(options.gallery) && options.gallery.length
          ? <Gallery images={options.gallery} />
          : ""
      }
    </Copy_Styled>
  );
}
