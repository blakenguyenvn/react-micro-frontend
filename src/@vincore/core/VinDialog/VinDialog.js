import Dialog from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialog } from 'app/store/common/dialogSlice';

function VinDialog(props) {
	const dispatch = useDispatch();
	const state = useSelector(({ common }) => common.dialog.state);
	const options = useSelector(({ common }) => common.dialog.options);

	return (
		<Dialog
			open={state}
			onClose={ev => dispatch(closeDialog())}
			aria-labelledby="vin-dialog-title"
			classes={{
				paper: 'rounded-8'
			}}
			{...options}
		/>
	);
}

export default VinDialog;
