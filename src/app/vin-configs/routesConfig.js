import VinUtils from '@vincore/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
import CallbackConfig from 'app/main/callback/CallbackConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import UserInterfaceConfig from 'app/main/user-interface/UserInterfaceConfig';
import { Redirect } from 'react-router-dom';

const routeConfigs = [
	...appsConfigs,
	...pagesConfigs,
	UserInterfaceConfig,
	LogoutConfig,
	LoginConfig,
	LogoutConfig,
	CallbackConfig
];

const routes = [
	...VinUtils.generateRoutesFromConfigs(routeConfigs, null),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/apps/dashboards/analytics" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
