import Markdown from "markdown-to-jsx";
import ReactPlayer from "react-player";
import styled, {css} from "styled-components";

import {
  $_BaseUnit
} from "../assets/styles/mixins.css";
import {
  TYPE
} from "../assets/styles/theme.css";

/**
 * =Player
************************************************************/

const Player_SC = styled(Player)`
  margin: ${$_BaseUnit(2)} 0;
  width: 100% !important;
    height: 100% !important;
`;

function Player (props = {}) {
  const {
    url = "",
    ar = "56.25%"
  } = props;

  return (
    <div
      style={{
        paddingBottom: ar,
        position: "relative"
      }}>
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: "0",
          left: "0"
        }}
      />
    </div>
  )
}

/**
 * =Copy
************************************************************/

const Copy_SC = styled.div`
  font-family: "apercu", sans-serif;

  margin: 0 auto ${$_BaseUnit(5)};
  width: 100%;
    max-width: ${$_BaseUnit(40)};

  h1 {
    margin-bottom: ${TYPE.scale.xl};
  }

  h2, h3, h4, h5, h6 {
    margin-top: 1em;
  }

  h2, h3, h4, h5, h6, p, img {
    margin-bottom: ${TYPE.scale.sm};
  }

  img, iframe {
    max-width: 100%;
  }
`;

function Copy ({title, copy}) {
  return (
    <Copy_SC>

      { title
        && <h1>{title}</h1>
      }

      <Markdown
        children={copy}
        options={{
          overrides: {
            Player: {
                component: Player,
            },
          },
        }}
      />
    </Copy_SC>
  );
}

export default Copy;
