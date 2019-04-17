/**
 * =Copy
************************************************************/

import Markdown from "markdown-to-jsx";
import styled from "styled-components";

import Gallery from "../gallery";
import Player from "../player";

// Theme/helpers/mixins
import {_baseUnit} from "../../assets/styles/mixins/_style";
import {TYPE} from "../../assets/styles/theme/_style";

/**
 * =Styles
******************************/

const Copy_SC = styled.div`
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
`;

/**
 * =Component
******************************/

export default function (props = {}) {
  const {
    title,
    copy,
    gallery
  } = props;

  const markdownOpts = {
    overrides: {
      Player: {
        component: Player
      }
    }
  };

  return (
    <Copy_SC>

      {title && <h1>{title}</h1>}

      <Markdown
        children={copy}
        options={markdownOpts}
      />

      {
        Array.isArray(gallery) && gallery.length
          ? <Gallery images={gallery} />
          : ""
      }
    </Copy_SC>
  );
}
