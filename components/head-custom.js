import Head from "next/head";

function HeadCustom (opts = {}) {
  let {
    title = "Girardot"
  } = opts;

  return (<>
    <Head>
      <meta name="viewport" content="width=device-width" />
      <title>{title}</title>
    </Head>
  </>);
}

export default HeadCustom;
