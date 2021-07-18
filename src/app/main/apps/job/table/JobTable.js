import _ from '@lodash';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@vincore/hooks';
import { getJobs } from '../store/jobListSlice';

function JobDetail(props) {
	const dispatch = useDispatch();

	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(getJobs(routeParams));
	}, [dispatch, routeParams]);

	return (
		<div className="p-16 sm:p-24">
			<div className="flex items-center justify-between overflow-hidden">
				<div className="flex flex-col">Job List</div>
			</div>

			<Divider className="my-24" />
		</div>
	);
}

export default withRouter(JobDetail);
