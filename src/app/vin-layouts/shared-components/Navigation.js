import VinNavigation from '@vincore/core/VinNavigation';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectNavigation } from 'app/store/vin/navigationSlice';
import { navbarCloseMobile } from '../../store/vin/navbarSlice';

function Navigation(props) {
	const navigation = useSelector(selectNavigation);
	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));
	const dispatch = useDispatch();

	function handleItemClick(item) {
		mdDown && dispatch(navbarCloseMobile());
	}

	return (
		<VinNavigation
			className={clsx('navigation', props.className)}
			navigation={navigation}
			layout={props.layout}
			dense={props.dense}
			active={props.active}
			onItemClick={handleItemClick}
		/>
	);
}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default memo(Navigation);
