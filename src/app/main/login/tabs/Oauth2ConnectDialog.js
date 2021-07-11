import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { closeOauthDialog } from 'app/auth/store/loginSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup.string().required('You must enter a name')
});

function Oauth2ConnectDialog(props) {
	const dispatch = useDispatch();
	const login = useSelector(({ auth }) => auth.login);
	const { oauthDialog, oauthConnect } = login;

	/**
	 * Close Dialog
	 */
	function closeComposeDialog() {
		return dispatch(closeOauthDialog());
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24'
			}}
			{...oauthDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<DialogContent classes={{ root: 'p-24' }}>
				<iframe
					src={oauthConnect.url}
					title="Vincere Authentication"
					width="100%"
					height="100%"
				/>
			</DialogContent>
		</Dialog>
	);
}

export default Oauth2ConnectDialog;
