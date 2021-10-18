import React, {useEffect} from "react";
import OnBoardingImage from "../Components/OnBoardingImage/OnBoardingImage";
import SignInForm from "../Components/SigninForm/SignInForm";
import SignInPageLayout from "../Layouts/PageLayouts/SignInpageLayout";
import SignInPageLayout2 from "../Layouts/PageLayouts/SignInPageLayout2";
import SignInPageLayout3 from "../Layouts/PageLayouts/SignInPageLayout3";
  import { useDispatch } from "react-redux";
import { homeCollections } from "../store/feature/homeSlice";
import SideMenubar from "../Components/SideMenubar/SideMenubar";
import SearchBox from "../Components/SearchBox/SearchBox";
import HeaderButton from "../Components/HeaderButton/HeaderButton";
import HeaderProfile from "../Components/HeaderProfileBox/HeaderProfile";
import Header from "../Components/Header/Header";
import Banner from "../Components/Home/Banner/Banner";
import Categories from "../Components/Home/Categories/Categories";
 
const Index = () => {
 
		const dispatch = useDispatch();

 
	return (
		<div>
			  <Categories/>
		</div>
	);
};

export default Index;
