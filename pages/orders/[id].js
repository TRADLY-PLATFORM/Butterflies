import React from 'react';
import MainLayout from '../../components/layouts/MainLayouts/MainLayout';
import OrderDetailsPageLayout from '../../components/layouts/PageLayouts/OrderDetailsPageLayout';

const OrderDetails = () => {
    return (
        <MainLayout>
            <OrderDetailsPageLayout/>
         </MainLayout>
    );
};

export default OrderDetails;