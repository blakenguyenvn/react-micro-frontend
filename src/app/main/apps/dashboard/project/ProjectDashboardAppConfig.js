import { lazy } from 'react';
import { authRoles } from 'app/auth';

const ProjectDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user,
	routes: [
		{
			path: '/apps/dashboards/project',
			component: lazy(() => import('./ProjectDashboardApp'))
		}
	]
};

export default ProjectDashboardAppConfig;
