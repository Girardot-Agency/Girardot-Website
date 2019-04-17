import DefaultLayout from "../layouts/default";
import Card, {cards} from "../components/card";
import ContentWrapper from "../components/content-wrapper";
import Grid from "../components/grid";
import Hero from "../components/hero";
import SectionTitle from "../components/section-title";

import exportMap from "../static/db/export-map.json";
const homepageData = exportMap["/index.html"];

/**
 * =IndexPage
************************************************************/

function IndexPage ({data = homepageData}) {
  return (
    <DefaultLayout>
      <Hero
        image={data.query.bannerLogo}
        strap={data.query.strap} />

      <section>
        <SectionTitle title={data.query.ourWorkTitle} />
        <ContentWrapper>
          <Grid
            cells={cards(data.query.ourWorkRels)}
            viewMore={"/our-work/index.html"} />
        </ContentWrapper>
      </section>

    </DefaultLayout>
  );
}

export default IndexPage;
