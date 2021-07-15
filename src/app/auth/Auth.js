import VinSplashScreen from '@vincore/core/VinSplashScreen';
import jwtService from 'app/services/jwtService';
import Oauth2Service from 'app/services/oauth2Service';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/vin/messageSlice';

import { setUserData, logoutUser } from './store/userSlice';

class Auth extends Component {
	state = {
		waitAuthCheck: true
	};

	componentDidMount() {
		return Promise.all([
			// Comment the lines which you do not use
			this.oauthCheck()
		]).then(() => {
			this.setState({ waitAuthCheck: false });
		});
	}

	oauthCheck = () =>
		new Promise(resolve => {
			Oauth2Service.on('onAutoLogin', accessedUser => {
				this.props.setUserData(accessedUser);
				this.props.showMessage({
					message: 'Logged in with Vincere Oauth'
				});

				resolve();
			});

			Oauth2Service.on('onAutoLogout', message => {
				if (message) {
					this.props.showMessage({ message });
				}

				this.props.logout();

				resolve();
			});

			Oauth2Service.on('onNoAccessToken', () => {
				resolve();
			});

			Oauth2Service.init();

			return Promise.resolve();
		});

	render() {
		return this.state.waitAuthCheck ? (
			<VinSplashScreen />
		) : (
			<>{this.props.children}</>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: logoutUser,
			setUserData,
			showMessage,
			hideMessage
		},
		dispatch
	);
}

export default connect(null, mapDispatchToProps)(Auth);
