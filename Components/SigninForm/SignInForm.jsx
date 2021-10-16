import React from 'react';

const SignInForm = () => {
    return (
		<div className="w-full  min-h-screen  py-36">
			<h2 className=" px-24  text-center text-white text-c-40 font-semibold mb-4">
				Welcome to Tradly Event
			</h2>
			<p className=" px-24  text-center text-white text-xl  font-semibold ">
				Login to your account
			</p>
			<div className=" mt-24 ">
				<div className=" flex flex-col  justify-center items-center">
					<input
						type="text"
						className=" w-96  h-12 mb-5 bg-transparent border  border-white rounded-3xl p-3 text-white outline-none placeholder-white"
						placeholder="Email"
					/>
					<input
						type="text"
						className=" w-96  h-12  bg-transparent  border border-white rounded-3xl p-3 text-white outline-none placeholder-white"
						placeholder="Password"
					/>
				</div>
				<div className=" mt-12 flex flex-col justify-center items-center">
					<button className=" mb-8 w-72 h-12 flex justify-center items-center bg-white rounded-3xl text-green-500 font-semibold  text-base">
						Log in
					</button>
					<button className=" w-96 h-6 flex justify-center items-center bg-transparent   text-white  font-medium  text-xl">
						Forgot your password?
					</button>
				</div>
				<div className=" mt-32 flex justify-center items-center">
					<button className=" w-96 h-6 flex justify-center items-center bg-transparent   text-white  font-medium  text-xl">
						Don’t have an account,
						<span className="font-semibold">
							Sign up{" "}
						</span>
					</button>
				</div>
			</div>
		</div>
    );           
};

export default SignInForm;