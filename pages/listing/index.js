import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MainLayout from "../../components/layouts/MainLayouts/MainLayout";
import ListingsPageLayout from '../../components/layouts/PageLayouts/ListingsPageLayout';
import { refreshPage } from '../../store/feature/authSlice';


const AllListings = () => {
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
            <ListingsPageLayout/>
             </MainLayout>
     );
};

export default AllListings;