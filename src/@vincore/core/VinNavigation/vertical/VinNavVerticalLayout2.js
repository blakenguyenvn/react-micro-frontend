import List from '@material-ui/core/List';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import VinNavVerticalTab from './types/VinNavVerticalTab';

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
		'&.dense': {}
	}
}));

function VinNavVerticalLayout2(props) {
	const classes = useStyles(props);
	const {
		navigation,
		layout,
		active,
		dense,
		className,
		onItemClick,
		firstLevel,
		selectedId
	} = props;
	const theme = useTheme();

	function handleItemClick(item) {
		onItemClick && onItemClick(item);
	}

	return (
		<List
			className={clsx(
				'navigation whitespace-nowrap items-center flex flex-col',
				classes.navigation,
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map(_item => (
				<VinNavVerticalTab
					key={_item.id}
					type={`vertical-${_item.type}`}
					item={_item}
					nestedLevel={0}
					onItemClick={handleItemClick}
					firstLevel={firstLevel}
					dense={dense}
					selectedId={selectedId}
				/>
			))}
		</List>
	);
}

export default VinNavVerticalLayout2;
