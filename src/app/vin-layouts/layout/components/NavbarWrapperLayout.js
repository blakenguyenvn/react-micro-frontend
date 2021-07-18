import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import NavbarToggleFab from 'app/vin-layouts/shared-components//NavbarToggleFab';
import { navbarCloseMobile } from 'app/store/common/navbarSlice';
import clsx from 'clsx';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectNavbarTheme } from 'app/store/common/settingsSlice';
import NavbarLayout from './NavbarLayout';
import NavbarMobileLayout from './NavbarMobileLayout';

const navbarWidth = 280;

const useStyles = makeStyles(theme => ({
	navbar: {
		height: 64,
		minHeight: 64,
		maxHeight: 64
	},
	navbarMobile: {
		width: navbarWidth,
		minWidth: navbarWidth,
		transition: theme.transitions.create(['width', 'min-width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.shorter
		})
	}
}));

function NavbarWrapperLayout(props) {
	const dispatch = useDispatch();
	const config = useSelector(
		({ common }) => common.settings.current.layout.config
	);
	const navbarTheme = useSelector(selectNavbarTheme);
	const navbar = useSelector(({ common }) => common.navbar);

	const classes = useStyles(props);

	return (
		<>
			<ThemeProvider theme={navbarTheme}>
				<Hidden mdDown>
					<NavbarLayout
						className={clsx(classes.navbar, props.className)}
					/>
				</Hidden>

				<Hidden lgUp>
					<SwipeableDrawer
						anchor="left"
						variant="temporary"
						open={navbar.mobileOpen}
						classes={{
							paper: clsx(
								classes.navbarMobile,
								'flex-col flex-auto h-full'
							)
						}}
						onClose={() => dispatch(navbarCloseMobile())}
						onOpen={() => {}}
						disableSwipeToOpen
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						<NavbarMobileLayout />
					</SwipeableDrawer>
				</Hidden>
			</ThemeProvider>

			{config.navbar.display && !config.toolbar.display && (
				<Hidden lgUp>
					<NavbarToggleFab />
				</Hidden>
			)}
		</>
	);
}

export default memo(NavbarWrapperLayout);
