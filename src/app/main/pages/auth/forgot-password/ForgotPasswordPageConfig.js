import { lazy } from 'react';
import { authRoles } from 'app/auth';

const ForgotPasswordPageConfig = {
	auth: authRoles.onlyGuest,
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/pages/auth/forgot-password',
			component: lazy(() => import('./ForgotPasswordPage'))
		}
	]
};

export default ForgotPasswordPageConfig;
