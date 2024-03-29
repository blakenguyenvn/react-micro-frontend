import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';
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
			}
		},
		'&.active-square-list': {
			'& .vin-list-item, & .active.vin-list-item': {
				width: '100%',
				borderRadius: '0'
			}
		},
		'&.dense': {
			'& .vin-list-item': {
				paddingTop: 0,
				paddingBottom: 0,
				height: 32
			}
		}
	}
}));

function VinNavVerticalLayout1(props) {
	const classes = useStyles(props);
	const { navigation, layout, active, dense, className, onItemClick } = props;
	const dispatch = useDispatch();

	function handleItemClick(item) {
		onItemClick && onItemClick(item);
	}

	return (
		<List
			className={clsx(
				'navigation whitespace-nowrap px-12',
				classes.navigation,
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map(_item => (
				<VinNavItem
					key={_item.id}
					type={`vertical-${_item.type}`}
					item={_item}
					nestedLevel={0}
					onItemClick={handleItemClick}
				/>
			))}
		</List>
	);
}

export default VinNavVerticalLayout1;
