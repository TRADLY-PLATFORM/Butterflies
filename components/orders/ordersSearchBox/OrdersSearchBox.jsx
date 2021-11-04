import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authSelector } from "../../../store/feature/authSlice";
import { get_orders } from "../../../store/feature/orderSlice";

const OrdersSearchBox = () => {
	const dispatch = useDispatch()
	const {auth_key}= useSelector(authSelector)
	const searchOrders = (e) => {
		dispatch(
			get_orders({
				authKey: auth_key,
				bodyParam: {
					page: 1,
					search_key:e.target.value
				},
			})
		);
		 
	};
	return (
		<div className=" h-12  md:w-80 xl:[300px]    rounded-c-48  bg-white shadow-c-sm  flex items-center overflow-hidden">
			<svg
				width="21"
				height="21"
				viewBox="0 0 21 21"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="ml-4"
			>
				<path
					d="M20.7099 19.2899L16.9999 15.6099C18.44 13.8143 19.1374 11.5352 18.9487 9.2412C18.76 6.94721 17.6996 4.81269 15.9854 3.27655C14.2713 1.74041 12.0337 0.919414 9.73283 0.982375C7.43194 1.04534 5.24263 1.98747 3.61505 3.61505C1.98747 5.24263 1.04534 7.43194 0.982375 9.73283C0.919414 12.0337 1.74041 14.2713 3.27655 15.9854C4.81269 17.6996 6.94721 18.76 9.2412 18.9487C11.5352 19.1374 13.8143 18.44 15.6099 16.9999L19.2899 20.6799C19.3829 20.7736 19.4935 20.848 19.6153 20.8988C19.7372 20.9496 19.8679 20.9757 19.9999 20.9757C20.1319 20.9757 20.2626 20.9496 20.3845 20.8988C20.5063 20.848 20.6169 20.7736 20.7099 20.6799C20.8901 20.4934 20.9909 20.2442 20.9909 19.9849C20.9909 19.7256 20.8901 19.4764 20.7099 19.2899ZM9.9999 16.9999C8.61544 16.9999 7.26206 16.5894 6.11091 15.8202C4.95977 15.051 4.06256 13.9578 3.53275 12.6787C3.00293 11.3996 2.86431 9.99214 3.13441 8.63427C3.4045 7.27641 4.07119 6.02912 5.05016 5.05016C6.02912 4.07119 7.27641 3.4045 8.63427 3.13441C9.99214 2.86431 11.3996 3.00293 12.6787 3.53275C13.9578 4.06256 15.051 4.95977 15.8202 6.11091C16.5894 7.26206 16.9999 8.61544 16.9999 9.9999C16.9999 11.8564 16.2624 13.6369 14.9497 14.9497C13.6369 16.2624 11.8564 16.9999 9.9999 16.9999Z"
					fill="#121212"
				/>
			</svg>
			<input
				className="h-full bg-transparent w-full pl-3 placeholder-gray-400 outline-none border-none ring-0 focus:ring-0"
				type="text"
				placeholder="Search order"
				onChange={(e) => searchOrders(e)}
			/>
		</div>
	);
};

export default OrdersSearchBox;
