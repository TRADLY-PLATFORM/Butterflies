import React from 'react';
import storeIcon from "../../../assets/Images/store/store.png"
import Image from "next/image";
import { useRouter } from 'next/dist/client/router';

const NoStore = () => {
    const router = useRouter()
    return (
		<div className=" flex flex-col justify-center    items-center  mt-10 ">
			<h1 className=" text-center text-3xl font-semibold text-black text-opacity-70  mt-10 ">
				You don’t have a Account
            </h1>
            <button className=" px-6 py-2 bg-primary rounded-md text-white text-base mt-7" onClick={()=> router.push('/a/create-store')}> Create Account</button>
            <div className=" w-[220px] h-[220px] relative mt-10">
                <Image src={ storeIcon} layout="fill" objectFit="contain" alt="store Icon" />
            </div>
		</div>
    );
};

export default NoStore;