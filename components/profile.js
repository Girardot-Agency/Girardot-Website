import Link from "next/link";
import styled from "styled-components";

import {
  $_Hidden,
  $_Flex,
  $_TransAll,
  $_BaseUnit
} from "../assets/styles/mixins.css";
import {
  BASE,
  COL,
  SCREEN,
  TYPE
} from "../assets/styles/theme.css";

import exportMap from "../static/db/export-map.json";

/**
 * =Card
************************************************************/

/**
 * =Card:styles
******************************/


/**
 * =Card:component
******************************/

function Profile ({pageData}) {
  const route = {
    pathname: pageData.page,
    query: pageData.query
  };

  return (
    <Card_SC>

      <div>
      </div>

      <div>
        {pageData.query.title}
      </div>

    </Card_SC>
  );
}

export default Profile;

/**
 * =Cards
************************************************************/

export function profiles (data) {
  let profiles = [];

  data.map((rel, i) => {
    const relPageData = exportMap[rel];

    console.log(relPageData);

    if (relPageData && relPageData !== undefined) {
      profiles.push(

        <div>Hello</div>
        // <Card
        //   key={`card-${i}`}
        //   pageData={relPageData}
        // />
      );
    }
  });

  return profiles;
}
