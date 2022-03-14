/* eslint-disable react/prop-types */
import  { useEffect } from "react";
import { useDispatch } from "react-redux";
  import { refreshPage } from "../../store/feature/authSlice";
import { all_listing_categories_page } from "../../tradly.config";
  
const Categories = ( ) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('refresh_key')) {
      dispatch(
        refreshPage({
          key: localStorage.getItem('refresh_key'),
        })
      );
    }
  }, [dispatch]);

 

  return all_listing_categories_page();
};

export default Categories;

 
