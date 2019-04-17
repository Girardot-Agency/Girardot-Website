/**
 * =Player
************************************************************/

import ReactPlayer from "react-player";

export default function (props = {}) {
  const {
    url = "",
    ar = "56.25%"
  } = props;

  return (
    <div
      style={{
        paddingBottom: ar,
        position: "relative",
        margin: "50px 0"
      }}>
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
        }}
      />
    </div>
  )
}
