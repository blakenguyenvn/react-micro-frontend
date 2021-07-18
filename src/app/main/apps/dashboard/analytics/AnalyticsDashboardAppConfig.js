import { lazy } from 'react';
import { authRoles } from 'app/auth';

const AnalyticsDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/apps/dashboards/analytics',
			component: lazy(() => import('./AnalyticsDashboardApp'))
		}
	]
};

export default AnalyticsDashboardAppConfig;
