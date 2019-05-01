import Head from "next/head";

export default function (props = {}) {
  let {
    title = " | Girardot",
    pageTitle = "Girardot"
  } = props;

  return (
    <Head>
      <meta name="viewport" content="width=device-width" />
      <title>{pageTitle + title}</title>
    </Head>
  );
}
