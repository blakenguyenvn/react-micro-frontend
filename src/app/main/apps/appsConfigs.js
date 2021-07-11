import CalendarAppConfig from './calendar/CalendarAppConfig';
import ChatAppConfig from './chat/ChatAppConfig';
import ContactsAppConfig from './contacts/ContactsAppConfig';
import AnalyticsDashboardAppConfig from './dashboards/analytics/AnalyticsDashboardAppConfig';
import ProjectDashboardAppConfig from './dashboards/project/ProjectDashboardAppConfig';
import MailAppConfig from './mail/MailAppConfig';

const appsConfigs = [
	AnalyticsDashboardAppConfig,
	ProjectDashboardAppConfig,
	MailAppConfig,
	ContactsAppConfig,
	CalendarAppConfig,
	ChatAppConfig
];

export default appsConfigs;
