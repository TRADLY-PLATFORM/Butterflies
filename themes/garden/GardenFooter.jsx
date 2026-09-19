/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { safeJSONParse } from '../../components/Shared/Constant/Constant';

// Garden footer: deep pine panel, serif brand, category + help links.
// Same data sources as the product footer (general configs, categories).
const GardenFooter = () => {
  const [logo, setLogo] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  // Read browser storage in an effect so the first client render matches
  // SSR exactly (reading it during render causes hydration mismatch once
  // another page has primed localStorage).
  const [general_configs, setGeneralConfigs] = useState(null);

  useEffect(() => {
    setGeneralConfigs(
      safeJSONParse(localStorage.getItem('general_configs'))
    );
    setLogo(localStorage.getItem('logo'));
    axios
      .get('/api/categories', { params: { parent: 0, type: 'listings' } })
      .then((res) => {
        if (Array.isArray(res.data?.categories)) {
          setAllCategories(res.data.categories.slice(0, 6));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-garden-pine text-white/90">
      <div className="max-w-[1224px] mx-auto px-4 md:px-[50px] py-12 grid gap-10 md:grid-cols-3">
        <div>
          {logo && (
            <Link
              href="/"
              className="inline-flex items-center max-w-[180px] max-h-[48px] overflow-hidden"
            >
              <img
                src={logo}
                alt="logo"
                className="object-contain max-h-[48px] max-w-[180px] brightness-0 invert"
              />
            </Link>
          )}
          <p className="mt-4 text-sm text-white/60 max-w-xs">
            Plants, seeds and honest tools from growers who love them as
            much as you do.
          </p>
        </div>
        <div>
          <p className="font-garden-serif text-lg text-white">Wander the beds</p>
          <div className="mt-3 flex flex-col gap-2">
            {allCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/lc/${cat.slug || cat.name}?category_id=${cat.id}&page=1`}
                className="text-sm text-white/70 hover:text-garden-sun transition-colors w-fit"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-garden-serif text-lg text-white">Help</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {general_configs?.terms_url && (
              <Link
                href={general_configs.terms_url}
                className="text-white/70 hover:text-garden-sun transition-colors w-fit"
              >
                Terms &amp; Conditions
              </Link>
            )}
            {general_configs?.privacy_policy_url && (
              <Link
                href={general_configs.privacy_policy_url}
                className="text-white/70 hover:text-garden-sun transition-colors w-fit"
              >
                Privacy Policy
              </Link>
            )}
            {general_configs?.support_url && (
              <Link
                href={general_configs.support_url}
                className="text-white/70 hover:text-garden-sun transition-colors w-fit"
              >
                Support
              </Link>
            )}
            <Link
              href="/sitemap.xml"
              className="text-white/70 hover:text-garden-sun transition-colors w-fit"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-[1224px] mx-auto px-4 md:px-[50px] py-4 text-xs text-white/40">
          © {new Date().getFullYear()} {general_configs?.app_name || 'Garden'}. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default GardenFooter;
