import ForgotPasswordPageConfig from './auth/forgot-password/ForgotPasswordPageConfig';
import LockPageConfig from './auth/lock/LockPageConfig';
import LoginPageConfig from './auth/login/LoginPageConfig';
import MailConfirmPageConfig from './auth/mail-confirm/MailConfirmPageConfig';
import ResetPasswordPageConfig from './auth/reset-password/ResetPasswordPageConfig';
import ComingSoonPageConfig from './coming-soon/ComingSoonPageConfig';
import Error404PageConfig from './errors/404/Error404PageConfig';
import Error500PageConfig from './errors/500/Error500PageConfig';

const pagesConfigs = [
	LoginPageConfig,
	ResetPasswordPageConfig,
	ForgotPasswordPageConfig,
	MailConfirmPageConfig,
	LockPageConfig,
	ComingSoonPageConfig,
	Error404PageConfig,
	Error500PageConfig
];

export default pagesConfigs;
