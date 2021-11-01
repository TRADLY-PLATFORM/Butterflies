import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignInPageLayout from '../components/layouts/PageLayouts/SignInPageLayout';
import { authSelector } from '../store/feature/authSlice';
 
const SignIn = () => {
	const router = useRouter()
	const {login}=useSelector(authSelector)
	useEffect(() => {
		if (login) {
			router.push("/")
		}
	}, [login, router]);
    return (
		<div>
 		 <SignInPageLayout/>
		</div>
    );
};

export default SignIn;