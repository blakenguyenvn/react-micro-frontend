import NavLinkAdapter from '@vincore/core/NavLinkAdapter';
import { Tooltip } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import VinNavBadge from '../../VinNavBadge';

const useStyles = makeStyles(theme => ({
	item: props => ({
		minHeight: 100,
		height: 100,
		width: 100,
		borderRadius: 12,
		margin: '0 0 4px 0',
		color: fade(theme.palette.text.primary, 0.7),
		cursor: 'pointer',
		textDecoration: 'none!important',
		padding: 0,
		'&.dense': {
			minHeight: 52,
			height: 52,
			width: 52
		},
		'&.type-divider': {
			padding: 0,
			height: 2,
			minHeight: 2,
			margin: '12px 0',
			backgroundColor:
				theme.palette.type === 'light'
					? 'rgba(0, 0, 0, .05)!important'
					: 'rgba(255, 255, 255, .1)!important',
			pointerEvents: 'none'
		},
		'&:hover': {
			color: theme.palette.text.primary
		},
		'&.active': {
			color: theme.palette.text.primary,
			backgroundColor:
				theme.palette.type === 'light'
					? 'rgba(0, 0, 0, .05)!important'
					: 'rgba(255, 255, 255, .1)!important',
			// pointerEvents: 'none',
			transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
			'& .vin-list-item-text-primary': {
				color: 'inherit'
			},
			'& .vin-list-item-icon': {
				color: 'inherit'
			}
		},
		'& .vin-list-item-icon': {
			color: 'inherit'
		},
		'& .vin-list-item-text': {}
	})
}));

function VinNavVerticalTab(props) {
	const dispatch = useDispatch();
	const location = useLocation();

	const { item, onItemClick, firstLevel, dense, selectedId } = props;
	const classes = useStyles(props);

	return useMemo(
		() => (
			<>
				<ListItem
					button
					component={item.url && NavLinkAdapter}
					to={item.url}
					className={clsx(
						classes.item,
						`type-${item.type}`,
						dense && 'dense',
						selectedId === item.id && 'active',
						'vin-list-item flex flex-col items-center justify-center p-12'
					)}
					onClick={() => onItemClick && onItemClick(item)}
					exact={item.exact}
				>
					{dense ? (
						<Tooltip title={item.title || ''} placement="right">
							<div className="w-32 h-32 min-h-32 flex items-center justify-center relative">
								{item.icon ? (
									<Icon
										className={clsx(
											'vin-list-item-icon text-24',
											item.iconClass
										)}
										color="action"
									>
										{item.icon}
									</Icon>
								) : (
									item.title && (
										<div className="font-bold text-16">
											{item.title[0]}
										</div>
									)
								)}
								{item.badge && (
									<VinNavBadge
										badge={item.badge}
										className="absolute top-0 ltr:right-0 rtl:left-0 min-w-16 h-16 p-4 justify-center"
									/>
								)}
							</div>
						</Tooltip>
					) : (
						<>
							<div className="w-32 h-32 min-h-32 flex items-center justify-center relative mb-8">
								{item.icon ? (
									<Icon
										className={clsx(
											'vin-list-item-icon text-32',
											item.iconClass
										)}
										color="action"
									>
										{item.icon}
									</Icon>
								) : (
									item.title && (
										<div className="font-bold text-20">
											{item.title[0]}
										</div>
									)
								)}
								{item.badge && (
									<VinNavBadge
										badge={item.badge}
										className="absolute top-0 ltr:right-0 rtl:left-0 min-w-16 h-16 p-4 justify-center"
									/>
								)}
							</div>

							<ListItemText
								className="vin-list-item-text flex-grow-0 w-full m-0"
								primary={item.title}
								classes={{
									primary:
										'text-12 font-medium vin-list-item-text-primary truncate text-center'
								}}
							/>
						</>
					)}
				</ListItem>
				{!firstLevel &&
					item.children &&
					item.children.map(_item => (
						<NavVerticalTab
							key={_item.id}
							type={`vertical-${_item.type}`}
							item={_item}
							nestedLevel={0}
							onItemClick={onItemClick}
							dense={dense}
							selectedId={selectedId}
						/>
					))}
			</>
		),
		[classes.item, firstLevel, item, onItemClick, dense, selectedId]
	);
}

VinNavVerticalTab.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		icon: PropTypes.string,
		url: PropTypes.string
	})
};

VinNavVerticalTab.defaultProps = {};

const NavVerticalTab = VinNavVerticalTab;

export default NavVerticalTab;
