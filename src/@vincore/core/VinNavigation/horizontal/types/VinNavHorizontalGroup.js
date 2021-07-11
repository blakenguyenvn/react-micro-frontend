import NavLinkAdapter from '@vincore/core/NavLinkAdapter';
import { useDebounce } from '@vincore/hooks';
import Grow from '@material-ui/core/Grow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { memo, useState, useMemo } from 'react';
import * as ReactDOM from 'react-dom';
import { Manager, Popper, Reference } from 'react-popper';
import { withRouter } from 'react-router-dom';
import VinNavItem from '../../VinNavItem';

const useStyles = makeStyles(theme => ({
	root: {
		color: theme.palette.text.primary,
		'&.active, &.active:hover, &.active:focus': {
			backgroundColor: `${theme.palette.secondary.main}!important`,
			color: `${theme.palette.secondary.contrastText}!important`,
			'& .vin-list-item-text-primary': {
				color: 'inherit'
			},
			'& .vin-list-item-icon': {
				color: 'inherit'
			}
		},
		'& .vin-list-item-text': {
			padding: '0 0 0 16px'
		},
		'&.level-0': {
			height: 44,
			borderRadius: 4,
			'&:hover': {
				background: 'transparent'
			}
		}
	},
	children: {},
	popper: {
		zIndex: 999
	},
	popperClose: {
		pointerEvents: 'none'
	}
}));

function isUrlInChildren(parent, url) {
	if (!parent.children) {
		return false;
	}

	for (let i = 0; i < parent.children.length; i += 1) {
		if (parent.children[i].children) {
			if (isUrlInChildren(parent.children[i], url)) {
				return true;
			}
		}

		if (
			parent.children[i].url === url ||
			url.includes(parent.children[i].url)
		) {
			return true;
		}
	}

	return false;
}

function VinNavHorizontalGroup(props) {
	const classes = useStyles(props);
	const [opened, setOpened] = useState(false);
	const { item, nestedLevel, dense } = props;
	const theme = useTheme();

	const handleToggle = useDebounce(open => {
		setOpened(open);
	}, 150);

	return useMemo(
		() => (
			<Manager>
				<Reference>
					{({ ref }) => (
						<div ref={ref}>
							<ListItem
								button
								className={clsx(
									'vin-list-item ',
									classes.root,
									'relative',
									`level-${nestedLevel}`,
									isUrlInChildren(
										item,
										props.location.pathname
									) && 'active'
								)}
								onMouseEnter={() => handleToggle(true)}
								onMouseLeave={() => handleToggle(false)}
								aria-owns={opened ? 'menu-vin-list-grow' : null}
								aria-haspopup="true"
								component={item.url ? NavLinkAdapter : 'li'}
								to={item.url}
								role="button"
							>
								{item.icon && (
									<Icon
										color="action"
										className={clsx(
											'vin-list-item-icon text-16 flex-shrink-0',
											item.iconClass
										)}
									>
										{item.icon}
									</Icon>
								)}

								<ListItemText
									className="vin-list-item-text"
									primary={item.title}
									classes={{ primary: 'text-13' }}
								/>

								{nestedLevel > 0 && (
									<IconButton
										disableRipple
										className="w-16 h-16 ltr:ml-4 rtl:mr-4 p-0"
										color="inherit"
									>
										<Icon className="text-16 arrow-icon">
											{theme.direction === 'ltr'
												? 'keyboard_arrow_right'
												: 'keyboard_arrow_left'}
										</Icon>
									</IconButton>
								)}
							</ListItem>
						</div>
					)}
				</Reference>
				{ReactDOM.createPortal(
					<Popper
						placement={
							nestedLevel === 0
								? theme.direction === 'ltr'
									? 'bottom-start'
									: 'bottom-end'
								: theme.direction === 'ltr'
								? 'right'
								: 'left'
						}
						eventsEnabled={opened}
						positionFixed
					>
						{({ ref, style, placement, arrowProps }) =>
							opened && (
								<div
									ref={ref}
									style={{
										...style,
										zIndex: 999 + nestedLevel
									}}
									data-placement={placement}
									className={clsx(classes.popper, {
										[classes.popperClose]: !opened
									})}
								>
									<Grow
										in={opened}
										id="menu-vin-list-grow"
										style={{ transformOrigin: '0 0 0' }}
									>
										<Paper
											className="rounded-8"
											onMouseEnter={() =>
												handleToggle(true)
											}
											onMouseLeave={() =>
												handleToggle(false)
											}
										>
											{item.children && (
												<ul
													className={clsx(
														classes.children,
														'popper-navigation-list',
														dense && 'dense',
														'px-0'
													)}
												>
													{item.children.map(
														_item => (
															<VinNavItem
																key={_item.id}
																type={`horizontal-${_item.type}`}
																item={_item}
																nestedLevel={
																	nestedLevel
																}
																dense={dense}
															/>
														)
													)}
												</ul>
											)}
										</Paper>
									</Grow>
								</div>
							)
						}
					</Popper>,
					document.querySelector('#root')
				)}
			</Manager>
		),
		[
			classes.children,
			classes.popper,
			classes.popperClose,
			classes.root,
			dense,
			handleToggle,
			item,
			nestedLevel,
			opened,
			props.location.pathname,
			theme.direction
		]
	);
}

VinNavHorizontalGroup.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		children: PropTypes.array
	})
};

VinNavHorizontalGroup.defaultProps = {};

const NavHorizontalGroup = withRouter(memo(VinNavHorizontalGroup));

export default NavHorizontalGroup;