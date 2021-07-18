import VinDialog from '@vincore/core/VinDialog';
import VinMessage from '@vincore/core/VinMessage';
import VinSuspense from '@vincore/core/VinSuspense';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from 'app/AppContext';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import FooterLayout from './components/FooterLayout';
import LeftSideLayout from './components/LeftSideLayout';
import NavbarWrapperLayout from './components/NavbarWrapperLayout';
import RightSideLayout from './components/RightSideLayout';
import ToolbarLayout from './components/ToolbarLayout';

const useStyles = makeStyles(theme => ({
	root: {
		'&.boxed': {
			clipPath: 'inset(0)',
			maxWidth: props => `${props.config.containerWidth}px`,
			margin: '0 auto',
			boxShadow:
				'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
		},
		'&.container': {
			'& .container': {
				maxWidth: props => `${props.config.containerWidth}px`,
				width: '100%',
				margin: '0 auto'
			}
		}
	}
}));

function Layout(props) {
	const config = useSelector(
		({ common }) => common.settings.current.layout.config
	);

	const classes = useStyles({ ...props, config });

	return (
		<AppContext.Consumer>
			{({ routes }) => (
				<div
					id="vin-layout"
					className={clsx(
						classes.root,
						config.mode,
						'w-full flex flex'
					)}
				>
					{config.leftSidePanel.display && <LeftSideLayout />}

					<div className="flex flex-col flex-auto min-w-0">
						<main
							id="vin-main"
							className="flex flex-col flex-auto min-h-screen min-w-0 relative"
						>
							{config.navbar.display && (
								<NavbarWrapperLayout
									className={clsx(
										config.navbar.style === 'fixed' &&
											'sticky top-0 z-50'
									)}
								/>
							)}

							{config.toolbar.display && (
								<ToolbarLayout
									className={clsx(
										config.toolbar.style === 'fixed' &&
											'sticky top-0',
										config.toolbar.position === 'above' &&
											'order-first z-40'
									)}
								/>
							)}

							<div className="flex flex-col flex-auto min-h-0 relative z-10">
								<VinDialog />

								<VinSuspense>
									{renderRoutes(routes)}
								</VinSuspense>

								{props.children}
							</div>

							{config.footer.display && (
								<FooterLayout
									className={
										config.footer.style === 'fixed' &&
										'sticky bottom-0'
									}
								/>
							)}
						</main>
					</div>

					{config.rightSidePanel.display && <RightSideLayout />}
					<VinMessage />
				</div>
			)}
		</AppContext.Consumer>
	);
}

export default memo(Layout);
