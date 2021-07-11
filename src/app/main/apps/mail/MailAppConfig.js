import i18next from 'i18next';
import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { authRoles } from 'app/auth';
import ar from './i18n/ar';
import en from './i18n/en';
import tr from './i18n/tr';

i18next.addResourceBundle('en', 'mailApp', en);
i18next.addResourceBundle('tr', 'mailApp', tr);
i18next.addResourceBundle('ar', 'mailApp', ar);

const MailAppConfig = {
	settings: {
		layout: {}
	},
	auth: authRoles.user,
	routes: [
		{
			path: [
				'/apps/mail/label/:labelHandle/:mailId?',
				'/apps/mail/filter/:filterHandle/:mailId?',
				'/apps/mail/:folderHandle/:mailId?'
			],
			component: lazy(() => import('./MailApp'))
		},
		{
			path: '/apps/mail',
			component: () => <Redirect to="/apps/mail/inbox" />
		}
	]
};

export default MailAppConfig;
