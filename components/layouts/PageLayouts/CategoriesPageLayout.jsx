import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
 import { useDispatch } from "react-redux";
import { authSelector } from '../../../store/feature/authSlice';
import { categories, categorySelector } from '../../../store/feature/categorySlice';
import Categories from '../../AllCategories/Categories';

const CategoriesPageLayout = () => {

    const {auth_key}= useSelector(authSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
			categories({
				prams: { parent:0,type: "listings" },
				authKey: auth_key,
			})
		);
    }, [0])
    const { all_categories } = useSelector(categorySelector);
    return (
		<div>
			<Categories allCategories={all_categories} />
		</div>
    );
};

export default CategoriesPageLayout;