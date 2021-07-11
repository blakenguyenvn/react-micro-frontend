import ForgotPasswordPageConfig from './auth/forgot-password/ForgotPasswordPageConfig';
import LockPageConfig from './auth/lock/LockPageConfig';
import LoginPageConfig from './auth/login/LoginPageConfig';
import MailConfirmPageConfig from './auth/mail-confirm/MailConfirmPageConfig';
import ResetPasswordPageConfig from './auth/reset-password/ResetPasswordPageConfig';
import ComingSoonPageConfig from './coming-soon/ComingSoonPageConfig';
import Error404PageConfig from './errors/404/Error404PageConfig';
import Error500PageConfig from './errors/500/Error500PageConfig';
import FaqPageConfig from './faq/FaqPageConfig';
import CompactInvoicePageConfig from './invoices/compact/CompactInvoicePageConfig';
import ModernInvoicePageConfig from './invoices/modern/ModernInvoicePageConfig';
import KnowledgeBasePageConfig from './knowledge-base/KnowledgeBaseConfig';
import MaintenancePageConfig from './maintenance/MaintenancePageConfig';
import ProfilePageConfig from './profile/ProfilePageConfig';
import ClassicSearchPageConfig from './search/classic/ClassicSearchPageConfig';
import ModernSearchPageConfig from './search/modern/ModernSearchPageConfig';

const pagesConfigs = [
	LoginPageConfig,
	ResetPasswordPageConfig,
	ForgotPasswordPageConfig,
	MailConfirmPageConfig,
	LockPageConfig,
	ComingSoonPageConfig,
	Error404PageConfig,
	Error500PageConfig,
	MaintenancePageConfig,
	ModernInvoicePageConfig,
	CompactInvoicePageConfig,
	ProfilePageConfig,
	ClassicSearchPageConfig,
	ModernSearchPageConfig,
	FaqPageConfig,
	KnowledgeBasePageConfig
];

export default pagesConfigs;
