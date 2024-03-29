import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import VinNavItem from '../VinNavItem';

const useStyles = makeStyles(theme => ({
	navigation: {
		'& .vin-list-item': {
			'&:hover': {
				backgroundColor:
					theme.palette.type === 'dark'
						? 'rgba(255, 255, 255, 0.05)'
						: 'rgba(0,0,0,.04)'
			},
			'&:focus:not(.active)': {
				backgroundColor:
					theme.palette.type === 'dark'
						? 'rgba(255, 255, 255, 0.06)'
						: 'rgba(0,0,0,.05)'
			},
			padding: '8px 12px 8px 12px',
			height: 40,
			minHeight: 40,
			'&.level-0': {
				height: 44,
				minHeight: 44
			},
			'& .vin-list-item-text': {
				padding: '0 0 0 8px'
			}
		},
		'&.active-square-list': {
			'& .vin-list-item': {
				borderRadius: '0'
			}
		}
	}
}));

function VinNavHorizontalLayout1(props) {
	const classes = useStyles(props);
	const { navigation, layout, active, dense, className } = props;

	return (
		<List
			className={clsx(
				'navigation whitespace-nowrap flex p-0',
				classes.navigation,
				classes.horizontalNavigation,
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map(_item => (
				<VinNavItem
					key={_item.id}
					type={`horizontal-${_item.type}`}
					item={_item}
					nestedLevel={0}
					dense={dense}
				/>
			))}
		</List>
	);
}

export default VinNavHorizontalLayout1;
