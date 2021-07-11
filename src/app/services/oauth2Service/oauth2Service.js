import VinUtils from '@vincore/utils/VinUtils';
import API from 'api';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import exampleUser from './exampleUser.json';
/* eslint-disable camelcase */

class Oauth2Service extends VinUtils.EventEmitter {
	init() {
		this.handleAuthentication();
	}

	handleAuthentication = () => {
		const vc_user_access = JSON.parse(this.getAccessToken());

		if (!vc_user_access) {
			this.emit('onNoAccessToken');

			return;
		}

		if (!_.isEmpty(vc_user_access)) {
			this.setSession(vc_user_access);
			this.emit('onAutoLogin', vc_user_access);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	connect = data => {
		return this.getUserExample(data);
	};

	reconnect = data => {
		return this.getUserExample(data);
	};

	disconnect = () => {
		this.setSession(null);
	};

	mapUser = data => {
		return {
			...data,
			data: { displayName: data.full_name, photoURL: data.photo_url }
		};
	};

	getUserExample = () => {
		return new Promise((resolve, reject) => {
			this.setSession(this.mapUser(exampleUser.content));
			resolve(this.mapUser(exampleUser.content));
		});
	};

	getUser = data => {
		return new Promise((resolve, reject) => {
			API.get(`/user?email=${data.email}`).then(response => {
				if (response) {
					this.setSession(this.mapUser(response.content));
					resolve(this.mapUser(response.content));
				} else {
					reject(response);
				}
			});
		});
	};

	setSession = access_user => {
		if (access_user) {
			localStorage.setItem('vc_user_access', JSON.stringify(access_user));
		} else {
			localStorage.removeItem('vc_user_access');
			delete API.defaults.headers.common.Authorization;
		}
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('vc_user_access');
	};
}

const instance = new Oauth2Service();

export default instance;
