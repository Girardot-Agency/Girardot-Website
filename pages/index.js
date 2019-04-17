/**
 * =Homepage
************************************************************/

// Layout
import DefaultLayout from "../layouts/default";

// External parts
import Card, {cards} from "../components/card";
import ContentWrapper from "../components/content-wrapper";
import Grid from "../components/grid";
import Hero from "../components/hero";
import SectionTitle from "../components/section-title";

// Theme/mixins/helpers etc
import exportMap from "../static/db/export-map.json";

/**
 * =Styles
******************************/

/**
 * =Component
******************************/

export default function (props = {}) {
  let {
    data = exportMap["/index.html"]
  } = props;

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
            buttonOptions={{
              type: "viewMore",
              href: "/our-work/index.html",
              align: "center"
            }}
          />
        </ContentWrapper>
      </section>

    </DefaultLayout>
  );
}
