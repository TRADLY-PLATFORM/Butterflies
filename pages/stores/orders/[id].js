import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../../components/layouts/MainLayouts/MainLayout';
import StoreOrderDetailsPageLayout from '../../../components/layouts/PageLayouts/StoreOrderDetailsPageLayout';
 import { refreshPage } from "../../../store/feature/authSlice";
 
const OrderDetails = () => {
      const dispatch = useDispatch();
      useEffect(() => {
		dispatch(
			refreshPage({
				key: localStorage.getItem("refresh_key"),
			})
		);
      }, [dispatch]);
    return (
        <MainLayout>
             <StoreOrderDetailsPageLayout/>
         </MainLayout>
    );
};

export default OrderDetails;