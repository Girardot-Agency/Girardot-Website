import Head from "next/head";

export default function (props = {}) {
  let {
    title = "Girardot"
  } = props;

  return (
    <Head>
      <meta name="viewport" content="width=device-width" />
      <title>{title}</title>
    </Head>
  );
}
