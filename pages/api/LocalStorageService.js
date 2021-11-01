const LocalStorageService = (function () {
	var _service;
	function _getService() {
		if (!_service) {
			_service = this;
			return _service;
		}
		return _service;
	}
	function _setToken(tokenObj) {
		localStorage.setItem("access_token", tokenObj.access_token);
		localStorage.setItem("refresh_token", tokenObj.refresh_token);
	}
	async function _getAccessToken() {
		try {
			const token =   localStorage.getItem("auth_key");
			return token;
		} catch (err) {
			return false;
		}
	}

	async function _getRefreshToken() {
 		try {
			const token = await localStorage.getItem("refresh_token");
			return token;
		} catch (err) {
			return false;
		}
	}
	function _getApiToken() {
		return localStorage.getItem("x_api_key");
	}
	function _clearToken() {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("x_api_key");
	}
	return {
		getService: _getService,
		setToken: _setToken,
		getAccessToken: _getAccessToken,
		getRefreshToken: _getRefreshToken,
		getApiToken: _getApiToken,
		clearToken: _clearToken,
	};
})();
export default LocalStorageService;
