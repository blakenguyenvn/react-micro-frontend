import VinLoading from '@vincore/core/VinLoading';
import PropTypes from 'prop-types';
import { Suspense } from 'react';

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */
function VinSuspense(props) {
	return (
		<Suspense fallback={<VinLoading {...props.loadingProps} />}>
			{props.children}
		</Suspense>
	);
}

VinSuspense.propTypes = {
	loadingProps: PropTypes.object
};

VinSuspense.defaultProps = {
	loadingProps: {
		delay: 0
	}
};

export default VinSuspense;
