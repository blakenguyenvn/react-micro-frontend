import _ from '@lodash';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
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

	const jobDetail = useSelector(({ jobApp }) => jobApp.jobDetail);

	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(getJob(routeParams));
	}, [dispatch, routeParams]);

	return (
		<div className="p-16 sm:p-24">
			<div className="flex items-center justify-between overflow-hidden">
				<div className="flex flex-col">
					{jobDetail && (
						<Typography className="flex-1 text-20 mx-16">
							{jobDetail.job_title}
						</Typography>
					)}
				</div>
			</div>

			<Divider className="my-24" />
		</div>
	);
}

export default withRouter(JobDetail);
