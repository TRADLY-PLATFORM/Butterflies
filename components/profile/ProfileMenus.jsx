 import React from 'react';
import Link from "next/link"
import { useDispatch } from 'react-redux';
import { logout } from '../../store/feature/authSlice';
 
const ProfileMenus = () => {
     const dispatch=useDispatch()
     return (
		<div className=" w-full h-min-[200px] p-[30px] bg-white rounded-lg shadow-c-sm">
			<div className=" border-b border-gray-900 border-opacity-30 py-4">
				<Link href="/orders" passHref={true}>
					<button className=" text-base text-gray-800 font-medium">
						My Orders
					</button>
				</Link>
			</div>
			<div className=" border-b border-gray-900 border-opacity-30 py-4">
				<Link href="#" passHref={true}>
					<button className=" text-base text-gray-800 font-medium">
						 Terms & conditions
					</button>
				</Link>
			</div>
			<div className=" border-b border-gray-900 border-opacity-30 py-4">
				<Link href="#" passHref={true}>
					<button className=" text-base text-gray-800 font-medium">
						Settings
					</button>
				</Link>
			</div>
			<div className=" border-b border-gray-900 border-opacity-30 py-4">
				<Link href="#" passHref={true}>
					<button className=" text-base text-gray-800 font-medium">
						Privacy Policy
					</button>
				</Link>
			</div>
			<div className="   border-gray-900 border-opacity-30 py-4">
				<button
					onClick={() => {
						dispatch(logout());
					}}
					className=" text-base  text-red-500 font-medium"
				>
					Log Out
				</button>
			</div>
		</div>
     );
 };
 
 export default ProfileMenus;