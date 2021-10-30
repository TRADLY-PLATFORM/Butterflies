import axios from "axios";
import LocalStorageService from "./pages/api/LocalStorageService";

const URL = process.env.REACT_APP_BACKEND_API_URL;
const instance = axios.create({
	baseURL: URL,
});

instance.defaults.headers.common["Content-Type"] = "application/json";
instance.defaults.headers.common["Cache-Control"] = "no-cache";
instance.defaults.headers.common["Pragma"] = "no-cache";
instance.defaults.headers.common["Expires"] = "0";

instance.interceptors.request.use(
	(config) => {
		const token = process.env.REACT_APP_API_KEY;

		config.headers["Authorization"] = "Bearer " + token;

		const authKey = LocalStorageService.getAccessToken();
		if (authKey) {
			config.headers["X-Auth-Key"] = authKey;
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);
var check = false;
instance.interceptors.response.use(
	(response) => {
		const originalRequest = response.config;
		if (
			response.status === 200 &&
			[`/v1/users/verify`, `/v1/users/login`].includes(
				originalRequest.url
			)
		) {
			const tokenObject = {
				access_token: response.data.data.user.key.auth_key,
				refresh_token:
					response.data.data.user.key.refresh_key,
			};
			LocalStorageService.setToken(tokenObject);
			instance.defaults.headers.common["Authorization"] =
				"Bearer " + process.env.REACT_APP_API_KEY;
			instance.defaults.headers.common["X-Auth-Key"] =
				LocalStorageService.getAccessToken();
			return response;
		}
		return response;
	},
	function (error) {
		const originalRequest = error.config;
		if (
			error.response.status !== undefined &&
			error.response.status === 401 &&
			check
		) {
			//originalRequest.url === '/user/refresh_token'
			//localStorage.clear();
			return Promise.reject(error);
		}

		if (
			error.response.status !== undefined &&
			error.response.status === 401 &&
			!check
		) {
			originalRequest._retry = true;
			return axios
				.get(URL + "/v1/users/token/refresh", {
					headers: {
						Authorization:
							"Bearer " +
							process.env.REACT_APP_API_KEY,
						"X-Refresh-Key":
							LocalStorageService.getRefreshToken(),
					},
				})
				.then((res) => {
					if (res.status === 200) {
						const tokenObject = {
							access_token:
								res.data.data.user.key
									.auth_key,
							refresh_token:
								res.data.data.user.key
									.refresh_key,
						};
						LocalStorageService.setToken(
							tokenObject
						);
						originalRequest.headers[
							"Authorization"
						] =
							"Bearer " +
							process.env.REACT_APP_API_KEY;
						originalRequest.headers[
							"X-Auth-Key"
						] =
							LocalStorageService.getAccessToken();
						return axios(originalRequest);
					}
				})
				.catch((error) => {
					check = true;
					//localStorage.clear();
				});
		}
		return Promise.reject(error);
	}
);

export default instance;
