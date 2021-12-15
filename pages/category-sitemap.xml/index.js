/* eslint-disable @typescript-eslint/no-empty-function */
import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import tradly from 'tradly';

export const getServerSideProps = async (ctx) => {
  const response = await tradly.app.getCategory({
    bodyParam: { parent: 0, type: 'listings' },
  });
  const categories = await response.data.categories;

  const fields = categories.map((category) => ({
    loc: `${process.env.SITE_URL}/lc/${category.name.replace(
      /\s/g,
      '-'
    )}?category_id=${category.id}&page=1`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.7,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
