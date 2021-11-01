import 'tailwindcss/tailwind.css'
import store from "../store/store";
import tradly from "tradly";
import { Provider } from "react-redux";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  	tradly.init.config("asl8msg11f1agc6c12361bs4516c5e1dl");

  return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
  );
}

export default MyApp
