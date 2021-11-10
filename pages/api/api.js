import axios from "axios";
import LocalStorageService from "./LocalStorageService";

const URL = process.env.BASE_URL;

const api = axios.create({
	baseURL: process.env.BASE_URL,
	headers: {
		"Content-Type": "application/json",
		"Cache-Control": "no-cache",
		Pragma: "no-cache",
		Expires: "0",
	},
});

api.interceptors.request.use((config) => {
 	config.headers["Authorization"] =
		"Bearer " + process.env.API_KEY;
	const authKey = localStorage.getItem("auth_key");
	if (authKey) {
		config.headers["X-Auth-Key"] = authKey;
	}
	return config;
});

var check = false;

api.interceptors.response.use(
    (response) => {
        
 		const originalRequest = response.config;
		if (
			response?.status === 200 &&
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
			api.defaults.headers.common["Authorization"] =
				"Bearer " + process.env.API_KEY;
			api.defaults.headers.common["X-Auth-Key"] =
				LocalStorageService.getAccessToken();
			return response;
		}
		return response;
	},
    async function (error) {
        // console.log(error);
        // console.log('====================================');
        // console.log(error.config);
        // console.log(error.response);
        // console.log('====================================');
		const originalRequest = error.config;
		if (
			error.response.status !== undefined &&
			error.response.status === 401 &&
			check
		) {
			originalRequest.url === '/user/refresh_token'
			localStorage.clear();
			return Promise.reject(error);
		}

		if (
			error.response?.status !== undefined &&
			error.response?.status === 401 &&
			!check
		) {
			originalRequest._retry = true;
			try {
                const res = await axios.get(
				URL + "/v1/users/token/refresh",
				{
					headers: {
						Authorization:
							"Bearer " +
							process.env.API_KEY,
						"X-Refresh-Key":
							LocalStorageService.getRefreshToken(),
					},
				}
			);
                if (res.status === 200) {
                    const tokenObject = {
                        access_token: res.data.data.user.key
                            .auth_key,
                        refresh_token: res.data.data.user.key
                            .refresh_key,
                    };
                    LocalStorageService.setToken(
                        tokenObject
                    );
                    originalRequest.headers["Authorization"] =
				"Bearer " + process.env.API_KEY;
                    originalRequest.headers["X-Auth-Key"] =
                        LocalStorageService.getAccessToken();
                    return axios(originalRequest);
                }
            } catch (error_1) {
                check = true;
            }
		}
		return Promise.reject(error);
	}
);

export default api;
