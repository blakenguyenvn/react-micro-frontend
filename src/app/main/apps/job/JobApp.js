import VinPageCarded from '@vincore/core/VinPageCarded';
import withReducer from 'app/store/withReducer';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import JobDetail from './detail/JobDetail';
import JobTable from './table/JobTable';
import reducer from './store';

function JobApp(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);
	const routeParams = useParams();

	useEffect(() => {}, [dispatch]);

	return (
		<VinPageCarded
			classes={{
				root: 'w-full',
				content: 'flex flex-col',
				header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			content={routeParams.mailId ? <JobDetail /> : <JobTable />}
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default withReducer('JobApp', reducer)(JobApp);
