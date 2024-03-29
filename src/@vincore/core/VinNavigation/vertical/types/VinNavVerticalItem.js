import NavLinkAdapter from '@vincore/core/NavLinkAdapter';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import VinNavBadge from '../../VinNavBadge';

const useStyles = makeStyles(theme => ({
	item: props => ({
		height: 40,
		width: '100%',
		borderRadius: '6px',
		margin: '0 0 4px 0',
		paddingRight: 12,
		paddingLeft: props.itemPadding > 80 ? 80 : props.itemPadding,
		color: fade(theme.palette.text.primary, 0.7),
		cursor: 'pointer',
		textDecoration: 'none!important',
		'&:hover': {
			color: theme.palette.text.primary
		},
		'&.active': {
			color: theme.palette.text.primary,
			backgroundColor:
				theme.palette.type === 'light'
					? 'rgba(0, 0, 0, .05)!important'
					: 'rgba(255, 255, 255, .1)!important',
			pointerEvents: 'none',
			transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
			'& .vin-list-item-text-primary': {
				color: 'inherit'
			},
			'& .vin-list-item-icon': {
				color: 'inherit'
			}
		},
		'& .vin-list-item-icon': {
			marginRight: 12,
			color: 'inherit'
		},
		'& .vin-list-item-text': {}
	})
}));

function VinNavVerticalItem(props) {
	const dispatch = useDispatch();
	const { item, nestedLevel, onItemClick } = props;
	const classes = useStyles({
		itemPadding: nestedLevel > 0 ? 28 + nestedLevel * 16 : 12
	});

	return useMemo(
		() => (
			<ListItem
				button
				component={NavLinkAdapter}
				to={item.url}
				activeClassName="active"
				className={clsx(classes.item, 'vin-list-item')}
				onClick={() => onItemClick && onItemClick(item)}
				exact={item.exact}
			>
				{item.icon && (
					<Icon
						className={clsx(
							'vin-list-item-icon text-20 flex-shrink-0',
							item.iconClass
						)}
						color="action"
					>
						{item.icon}
					</Icon>
				)}

				<ListItemText
					className="vin-list-item-text"
					primary={item.title}
					classes={{
						primary:
							'text-13 font-medium vin-list-item-text-primary'
					}}
				/>

				{item.badge && <VinNavBadge badge={item.badge} />}
			</ListItem>
		),
		[classes.item, item, onItemClick]
	);
}

VinNavVerticalItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		icon: PropTypes.string,
		url: PropTypes.string
	})
};

VinNavVerticalItem.defaultProps = {};

const NavVerticalItem = VinNavVerticalItem;

export default NavVerticalItem;
