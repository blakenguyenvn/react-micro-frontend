import { ThemeProvider } from '@material-ui/core/styles';
import { memo, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/vin/settingsSlice';

const useEnhancedEffect =
	typeof window === 'undefined' ? useEffect : useLayoutEffect;

function VinTheme(props) {
	const direction = useSelector(({ vin }) => vin.settings.defaults.direction);
	const mainTheme = useSelector(selectMainTheme);

	useEnhancedEffect(() => {
		document.body.dir = direction;
	}, [direction]);

	return <ThemeProvider theme={mainTheme}>{props.children}</ThemeProvider>;
}

export default memo(VinTheme);
