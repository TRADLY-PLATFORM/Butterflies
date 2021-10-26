import "../styles/globals.css";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../store/store";
import tradly from "tradly";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
	const [config_response, setConfigsStatus] = useState(false);
	tradly.init
		.config("tradlysocial")
		.then((response) => {
			if (response.status) {
				setConfigsStatus(true);
			}
		})
		.catch((error) => {
			console.log("====================================");
			console.log(error);
			console.log("====================================");
		});
	useEffect(() => {
		if (config_response) {
			tradly.init
				.refreshAPI(localStorage.getItem("refresh_key"))
				.then((res) => {
					if (res.status) {
						localStorage.setItem(
							"auth_key",
							res.data.user?.key.auth_key
						);
						localStorage.setItem(
							"refresh_key",
							res.data.user?.key.refresh_key
						);
					}
				});
		}
	}, [config_response]);
	return (
		<Provider store={store}>
			{config_response && <Component {...pageProps} />}
		</Provider>
	);
}
export default MyApp;

//  const home = async () => {
// 		try {
// 			const response = await tradly.app.home();
// 			const data = await response.json();

// 		} catch (e) {
// 			return console.log(e.response.data);
// 		}
// 	};

// home()
// const req = {
// 	uuid: "31231h23j123g123",
// 	type: "customer",
// 	email: "dev@dev.com",
// 	password: "12345",
// };
// tradly.user
// 	.login(
// 		JSON.stringify({ user: req }),
// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzQ3MTk5MDEsImRhdGEiOiIzZTZlM2QwYzFkMDUxMmZhZDJjYzU1OTQ3NGY3YzJkZDIwOWVkZmQ2ZDRmMWFlZDJlYWI3YjQxZTE0ZWZiOGQzMzZlNTVhMjhkMTQ0MjNkMGFjOGM4OWM3YWQ4YjkwZTBmOTU5YTllODFlMWYzM2ExMmQ1YWNhMWMyMjZmMDdiNiIsImlhdCI6MTYzNDcxODEwMH0.JwOZDPebs-QiGXNfRN5kexV6gY7AswJ6ORjYQYm2ap4"
// 	)
// 	.then((response) => {
// 		console.log("====================================");
// 		console.log(response);
// 		console.log("====================================");
// 	})
// 	.catch((error) => {
// 		console.log("====================================");
// 		console.log(error);
// 		console.log("====================================");
// 	});
