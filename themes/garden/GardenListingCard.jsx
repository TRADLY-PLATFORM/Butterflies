/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getThumbnailImage } from '../../components/Shared/Constant/Constant';

// Garden listing card: tall imagery-led card, serif plant name,
// grower identity + quiet price. Same data shape as other cards.
const GardenListingCard = ({ item }) => {
  if (!item) return null;
  const href = item.slug
    ? `/l/${item.slug}`
    : `/l/${item.id}-${(item.title || '').replace(/\W/g, '-')}`;
  return (
    <Link
      href={href}
      className="block w-full bg-white rounded-2xl overflow-hidden cursor-pointer shadow-c-sm transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-garden-cream">
        {item?.images?.length > 0 && (
          <Image
            src={getThumbnailImage(item?.images[0])}
            alt={item.title}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <div className="p-4">
        <p className="font-garden-serif text-lg leading-snug text-garden-pine line-clamp-2 min-h-[3.25rem]">
          {item.title}
        </p>
        {(item.account?.name || item.location?.city) && (
          <p className="mt-1 text-xs text-garden-soil/70 truncate">
            {[item.account?.name, item.location?.city]
              .filter(Boolean)
              .join(' · ')}
          </p>
        )}
        <p className="mt-2 text-base font-semibold text-garden-leaf">
          {item.list_price?.formatted}
        </p>
      </div>
    </Link>
  );
};

export default GardenListingCard;
