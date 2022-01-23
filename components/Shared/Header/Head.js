 import Head from 'next/head';

const Add_Head = ({pageTitle, pageDescription}) => {
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={`${pageDescription}`} />
      <meta property="og:title" content={`${pageTitle}`} key="title" />
    </Head>
  );
};

export default Add_Head;