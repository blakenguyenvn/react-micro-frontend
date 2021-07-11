import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';

const ContactsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/apps/contacts/:id',
			component: lazy(() => import('./ContactsApp'))
		},
		{
			path: '/apps/contacts',
			component: () => <Redirect to="/apps/contacts/all" />
		}
	]
};

export default ContactsAppConfig;
