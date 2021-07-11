import { lazy } from 'react';
import { authRoles } from 'app/auth';

const CalendarAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/apps/calendar',
			component: lazy(() => import('./CalendarApp'))
		}
	]
};

export default CalendarAppConfig;
