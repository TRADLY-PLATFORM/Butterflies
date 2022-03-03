import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import CustomLoading from '../components/Shared/Loading/CustomLoading';
import tradly from 'tradly';

const set_auth = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.k) {
      localStorage.setItem('auth_key', router.query.k);
      tradly.app
        .getUserDetail({
          authKey: router.query.k,
          id: 'b6eca4ea-43b7-42b9-a815-0399e4bfacee',
        })
        .then((res) => {
          console.log(res);
        });
    }
  }, [router]);

  return (
    <>
      <CustomLoading />
      <div className="w-screen h-screen flex justify-center items-center">
        <p>Processing..</p>
      </div>
    </>
  );
};

export default set_auth;
