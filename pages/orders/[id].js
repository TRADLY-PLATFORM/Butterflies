import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import OrderDetailsPageLayout from '../../components/layouts/PageLayouts/OrderDetailsPageLayout';
import { refreshPage } from "../../store/feature/authSlice";
 
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
            <OrderDetailsPageLayout/>
         </MainLayout>
    );
};

export default OrderDetails;