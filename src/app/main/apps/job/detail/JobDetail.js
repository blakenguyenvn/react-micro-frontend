import _ from '@lodash';
import VinPageSimple from '@vincore/core/VinPageSimple';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@vincore/hooks';
import { getJob } from '../store/jobSlice';

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	}
}));

function JobDetail(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const pageLayout = useRef(null);

	const jobDetail = useSelector(({ jobApp }) => jobApp.jobDetail);

	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(getJob(routeParams));
	}, [dispatch, routeParams]);

	if (!jobDetail) {
		return null;
	}

	return (
		<VinPageSimple
			classes={{
				header: 'min-h-160 h-160 lg:ltr:rounded-br-20 lg:rtl:rounded-bl-20 lg:ltr:mr-12 lg:rtl:ml-12',
				toolbar: 'min-h-56 h-56 items-end',
				rightSidebar: 'w-288 border-0 py-12',
				content: classes.content
			}}
			content={
				<div className="p-12 lg:ltr:pr-0 lg:rtl:pl-0">
					<div className="p-16 sm:p-24">
						<div className="flex items-center justify-between overflow-hidden">
							<div className="flex flex-col">Job Detail</div>
						</div>

						<Divider className="my-24" />
					</div>
				</div>
			}
			ref={pageLayout}
		/>
	);
}

export default withRouter(JobDetail);
