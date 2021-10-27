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
 
	return (
		<Provider store={store}>
			{config_response && <Component {...pageProps} />}
		</Provider>
	);
}
export default MyApp;

