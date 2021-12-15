/* eslint-disable @typescript-eslint/no-empty-function */
import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import tradly from 'tradly';

export const getServerSideProps = async (ctx) => {
  var all_listings = [];

  const response = await tradly.app.getListings({
    bodyParam: { page: 1 },
  });
  const total_records = await response.data.total_records;

  const totalPages = Math.ceil(total_records / 10);

  let fields ;
  // listings.map((listing) => ({
  //   loc: `${process.env.SITE_URL}/listing/${listing.id}`,
  //   lastmod: new Date().toISOString(),
  //   changefreq: 'daily',
  //   priority: 0.7,
  // }));
  for (let index = 0; index < totalPages; index++) {

    const response = await tradly.app.getListings({
      bodyParam: { page: index + 1, per_page: 10 },
    });

    const listings = await response.data.listings;
    all_listings.push(...listings);

   
  }
 

  fields = all_listings.map((listing) => ({
    loc: `${process.env.SITE_URL}/l/${listing.id}-${item.title.replace(
      /\W/g,
      '-'
    )}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.7,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
