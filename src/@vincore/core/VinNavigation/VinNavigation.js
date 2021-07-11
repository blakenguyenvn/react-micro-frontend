import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { memo } from 'react';
import _ from '@lodash';
import VinNavHorizontalLayout1 from './horizontal/VinNavHorizontalLayout1';
import VinNavVerticalLayout1 from './vertical/VinNavVerticalLayout1';
import VinNavVerticalLayout2 from './vertical/VinNavVerticalLayout2';
import VinNavHorizontalCollapse from './horizontal/types/VinNavHorizontalCollapse';
import VinNavHorizontalGroup from './horizontal/types/VinNavHorizontalGroup';
import VinNavHorizontalItem from './horizontal/types/VinNavHorizontalItem';
import VinNavHorizontalLink from './horizontal/types/VinNavHorizontalLink';
import VinNavVerticalCollapse from './vertical/types/VinNavVerticalCollapse';
import VinNavVerticalGroup from './vertical/types/VinNavVerticalGroup';
import VinNavVerticalItem from './vertical/types/VinNavVerticalItem';
import VinNavVerticalLink from './vertical/types/VinNavVerticalLink';
import { registerComponent } from './VinNavItem';
/*
	Register Vin Navigation Components
 */
registerComponent('vertical-group', VinNavVerticalGroup);
registerComponent('vertical-collapse', VinNavVerticalCollapse);
registerComponent('vertical-item', VinNavVerticalItem);
registerComponent('vertical-link', VinNavVerticalLink);
registerComponent('horizontal-group', VinNavHorizontalGroup);
registerComponent('horizontal-collapse', VinNavHorizontalCollapse);
registerComponent('horizontal-item', VinNavHorizontalItem);
registerComponent('horizontal-link', VinNavHorizontalLink);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

const useStyles = makeStyles(theme => ({
	'@global': {
		'.popper-navigation-list': {
			'& .vin-list-item': {
				padding: '8px 12px 8px 12px',
				height: 40,
				minHeight: 40,
				'& .vin-list-item-text': {
					padding: '0 0 0 8px'
				}
			},
			'&.dense': {
				'& .vin-list-item': {
					minHeight: 32,
					height: 32,
					'& .vin-list-item-text': {
						padding: '0 0 0 8px'
					}
				}
			}
		}
	}
}));

function VinNavigation(props) {
	const classes = useStyles(props);
	const options = _.pick(props, [
		'navigation',
		'layout',
		'active',
		'dense',
		'className',
		'onItemClick',
		'firstLevel',
		'selectedId'
	]);
	if (props.navigation.length > 0) {
		switch (props.layout) {
			case 'horizontal': {
				return <VinNavHorizontalLayout1 {...options} />;
			}
			case 'vertical': {
				return <VinNavVerticalLayout1 {...options} />;
			}
			case 'vertical-2': {
				return <VinNavVerticalLayout2 {...options} />;
			}
			default: {
				return <VinNavVerticalLayout1 {...options} />;
			}
		}
	} else {
		return null;
	}
}

VinNavigation.propTypes = {
	navigation: PropTypes.array.isRequired
};

VinNavigation.defaultProps = {
	layout: 'vertical'
};

export default memo(VinNavigation);
