import { authRoles } from 'app/auth';
import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

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
				id: 'dashboards',
				title: 'Dashboards',
				translate: 'DASHBOARDS',
				type: 'collapse',
				auth: authRoles.user,
				icon: 'dashboard',
				children: [
					{
						id: 'analytics-dashboard',
						title: 'Analytics',
						type: 'item',
						auth: authRoles.user,
						url: '/apps/dashboards/analytics'
					},
					{
						id: 'project-dashboard',
						title: 'Project',
						type: 'item',
						auth: authRoles.user,
						url: '/apps/dashboards/project'
					}
				]
			},
			{
				id: 'calendar',
				title: 'Calendar',
				translate: 'CALENDAR',
				auth: authRoles.user,
				type: 'item',
				icon: 'today',
				url: '/apps/calendar'
			},
			{
				id: 'mail',
				title: 'Mail',
				translate: 'MAIL',
				type: 'item',
				auth: authRoles.user,
				icon: 'email',
				url: '/apps/mail',
				badge: {
					title: 25,
					bg: '#F44336',
					fg: '#FFFFFF'
				}
			},
			{
				id: 'contacts',
				title: 'Contacts',
				translate: 'CONTACTS',
				type: 'item',
				auth: authRoles.user,
				icon: 'account_box',
				url: '/apps/contacts/all'
			},
			{
				id: 'chat',
				title: 'Chat',
				translate: 'CHAT',
				type: 'item',
				auth: authRoles.user,
				icon: 'chat',
				url: '/apps/chat',
				badge: {
					title: 13,
					bg: 'rgb(9, 210, 97)',
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
