import VinScrollbars from '@vincore/core/VinScrollbars';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import { toggleQuickPanel } from './store/stateSlice';
import reducer from './store';

const useStyles = makeStyles(theme => ({
	root: {
		width: 280
	}
}));

function QuickPanel(props) {
	const dispatch = useDispatch();
	const state = useSelector(({ quickPanel }) => quickPanel.state);

	const classes = useStyles();

	return (
		<SwipeableDrawer
			classes={{ paper: classes.root }}
			open={state}
			anchor="right"
			onOpen={ev => {}}
			onClose={ev => dispatch(toggleQuickPanel())}
			disableSwipeToOpen
		>
			<VinScrollbars>
				<Typography>Quick Panel</Typography>
			</VinScrollbars>
		</SwipeableDrawer>
	);
}

export default withReducer('quickPanel', reducer)(memo(QuickPanel));
