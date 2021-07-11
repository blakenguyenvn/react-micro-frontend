import VinSplashScreen from '@vincore/core/VinSplashScreen';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Callback(props) {
	const dispatch = useDispatch();

	useEffect(() => {}, [dispatch]);

	return <VinSplashScreen />;
}

export default Callback;
