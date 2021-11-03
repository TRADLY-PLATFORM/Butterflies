import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import MainLayout from "../../components/layouts/MainLayouts/MainLayout";
import CategoriesPageLayout from '../../components/layouts/PageLayouts/CategoriesPageLayout';
import { refreshPage } from '../../store/feature/authSlice';

const Categories = () => {

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
            <CategoriesPageLayout/>
         </MainLayout>
    );
};

export default Categories;