import '../styles/globals.css'
 import axios from "axios";
import { Provider } from 'react-redux';
import store from '../store/store';
//  import tradly from "tradly" 


// axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_URL;

function MyApp({ Component, pageProps }) {
	// tradly.init
	// 	.configApi("tradlysocial")
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
	
  return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
  );
}
export default MyApp
