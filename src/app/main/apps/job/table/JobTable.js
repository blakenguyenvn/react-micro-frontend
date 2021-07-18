import React, { useEffect } from 'react';
import _ from '@lodash';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { getJobs } from '../store/jobListSlice';

function JobTable(props) {
	const dispatch = useDispatch();

	const routeParams = useParams();

	useEffect(() => {
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

export default withRouter(JobTable);
