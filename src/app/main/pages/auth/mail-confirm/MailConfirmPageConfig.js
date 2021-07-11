import { lazy } from 'react';
import { authRoles } from 'app/auth';

const MailConfirmPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/pages/auth/mail-confirm',
			component: lazy(() => import('./MailConfirmPage'))
		}
	]
};

export default MailConfirmPageConfig;
