import '../styles/globals.css'
 import axios from "axios";
import { Provider } from 'react-redux';
import store from '../store/store';



// axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_URL;

function MyApp({ Component, pageProps }) {
  return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
  );
}
export default MyApp
