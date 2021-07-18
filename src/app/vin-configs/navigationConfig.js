import { authRoles } from 'app/auth';

const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'APPLICATIONS',
		type: 'group',
		auth: authRoles.user,
		icon: 'apps',
		children: [
			{
				id: 'job',
				title: 'Job',
				translate: 'JOB',
				type: 'item',
				auth: authRoles.user,
				icon: 'job',
				url: '/apps/job',
				badge: {
					title: 25,
					bg: '#F44336',
					fg: '#FFFFFF'
				}
			}
		]
	},
	{
		id: 'auth',
		title: 'Auth',
		type: 'group',
		icon: 'verified_user',
		children: [
			{
				id: 'login',
				title: 'Login',
				type: 'item',
				url: '/login',
				auth: authRoles.onlyGuest,
				icon: 'lock'
			},
			{
				id: 'register',
				title: 'Register',
				type: 'item',
				url: '/register',
				auth: authRoles.onlyGuest,
				icon: 'person_add'
			},
			{
				id: 'logout',
				title: 'Logout',
				type: 'item',
				auth: authRoles.user,
				url: '/logout',
				icon: 'exit_to_app'
			}
		]
	}
];

export default navigationConfig;
