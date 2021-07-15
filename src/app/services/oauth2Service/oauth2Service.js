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
		return this.getUser(data);
	};

	reconnect = data => {
		return this.getUser(data);
	};

	disconnect = () => {
		this.setSession(null);
	};

	mapUser = mapData => {
		return {
			...mapData,
			redirectUrl: '/',
			role: 'admin',
			data: {
				displayName: mapData.full_name,
				photoURL: mapData.photo_url
			}
		};
	};

	getUserExample = () => {
		return new Promise((resolve, reject) => {
			this.setSession(this.mapUser(exampleUser.content));

			resolve(this.mapUser(exampleUser.content));
		});
	};

	getUser = requestData => {
		return new Promise((resolve, reject) => {
			API.get(`/user?email=${requestData.email}`).then(response => {
				const { data } = response;

				if (data) {
					this.setSession(this.mapUser(data.content));
					resolve(this.mapUser(data.content));
				} else {
					reject(data);
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

	getAccessToken = () => {
		return window.localStorage.getItem('vc_user_access');
	};
}

const instance = new Oauth2Service();

export default instance;
