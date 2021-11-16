import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SignInPageLayout from '../components/layouts/PageLayouts/SignInPageLayout';
import { authSelector } from '../store/feature/authSlice';
 import tradly from 'tradly';

const SignIn = (props) => {
	console.log('====================================');
	console.log(props);
	console.log('====================================');
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

export async function getServerSideProps() {
  const response = await tradly.app.getConfigList({
    paramBody: 'general',
  });
  return {
    props: { general_configs: response?.data?.configs },
  };
}