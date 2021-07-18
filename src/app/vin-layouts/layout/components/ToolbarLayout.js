import VinSearch from '@vincore/core/VinSearch';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from 'app/vin-layouts/shared-components/Logo';
import UserMenu from 'app/vin-layouts/shared-components/UserMenu';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectToolbarTheme } from 'app/store/common/settingsSlice';

const useStyles = makeStyles(theme => ({
	root: {}
}));

function ToolbarLayout(props) {
	const config = useSelector(
		({ common }) => common.settings.current.layout.config
	);
	const toolbarTheme = useSelector(selectToolbarTheme);

	const classes = useStyles(props);

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="vin-toolbar"
				className={clsx(
					classes.root,
					'flex relative z-20 shadow-md',
					props.className
				)}
				color="default"
				style={{
					backgroundColor: toolbarTheme.palette.background.paper
				}}
			>
				<Toolbar className="container p-0 lg:px-24 min-h-48 md:min-h-64">
					<Hidden mdDown>
						<div
							className={clsx('flex flex-shrink-0 items-center')}
						>
							<Logo />
						</div>
					</Hidden>

					<div className="flex flex-1">
						<Hidden xsDown>
							<VinSearch
								className="mx-16 lg:mx-24"
								variant="basic"
							/>
						</Hidden>
					</div>

					<div className="flex items-center px-8 md:px-0 h-full overflow-x-auto">
						<Hidden smUp>
							<VinSearch />
						</Hidden>

						<UserMenu />
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(ToolbarLayout);
