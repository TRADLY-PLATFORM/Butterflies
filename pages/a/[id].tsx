import { safeJSONParse } from '../../components/Shared/Constant/Constant';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { refreshPage } from '../../store/feature/authSlice';
import { setGeneralConfig } from '../../store/feature/configsSlice';
import DefaultErrorPage from 'next/error';
import { accounts_details_page } from '../../tradly.config';
import type { GetServerSideProps } from 'next';
import type { AccountDetailProps } from '../../types';

const StoreDetails = ({ initialAccount, initialListings }: AccountDetailProps) => {
  const [MARKETPLACE_FLAVOURS, setMARKETPLACE_FLAVOURS] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const general_configs = safeJSONParse(localStorage.getItem('general_configs'));
    if (localStorage.getItem('refresh_key')) {
      dispatch(refreshPage({ key: localStorage.getItem('refresh_key') }));
    }
    dispatch(setGeneralConfig({ general_configs }));
    setMARKETPLACE_FLAVOURS(Number(localStorage.getItem('MARKETPLACE_FLAVOURS')));
  }, [dispatch]);

  return (
    MARKETPLACE_FLAVOURS &&
    (MARKETPLACE_FLAVOURS === 1 ? (
      accounts_details_page()
    ) : (
      <DefaultErrorPage statusCode={404} />
    ))
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const BASE = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${BASE}/api/a/${id}`);
    const data = res.ok ? await res.json() : null;
    return {
      props: {
        initialAccount: data?.account ?? null,
        initialListings: data?.listings ?? null,
      },
    };
  } catch {
    return { props: { initialAccount: null, initialListings: null } };
  }
};

export default StoreDetails;
