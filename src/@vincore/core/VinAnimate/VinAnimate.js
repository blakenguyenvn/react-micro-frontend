import PropTypes from 'prop-types';
import { forwardRef, cloneElement, memo } from 'react';
import { VelocityComponent } from 'velocity-react';
import 'velocity-animate/velocity.ui';

const VinAnimate = forwardRef((props, ref) => {
	const children = cloneElement(props.children, {
		style: {
			...props.children.style,
			visibility: 'hidden'
		}
	});
	return (
		<VelocityComponent ref={ref} {...props}>
			{children}
		</VelocityComponent>
	);
});

VinAnimate.propTypes = {
	children: PropTypes.element.isRequired
};

VinAnimate.defaultProps = {
	animation: 'transition.fadeIn',
	runOnMount: true,
	targetQuerySelector: null,
	interruptBehavior: 'stop',
	visibility: 'visible',
	duration: 300,
	delay: 50,
	easing: [0.4, 0.0, 0.2, 1],
	display: null,
	setRef: undefined
};

export default memo(VinAnimate);
