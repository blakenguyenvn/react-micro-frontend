import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';

const JobAppConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.user,
	routes: [
		{
			path: ['/apps/jobs'],
			component: lazy(() => import('./JobApp'))
		},
		{
			path: ['/apps/job/:jobId?'],
			component: lazy(() => import('./JobApp'))
		}
	]
};

export default JobAppConfig;
