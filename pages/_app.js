import "tailwindcss/tailwind.css";
import store from "../store/store";
import tradly from "tradly";
import { Provider } from "react-redux";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	tradly.init.config({
		token: process.env.API_KEY,
		environment: process.env.ENVIRONMENT_NAME,
	});

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
