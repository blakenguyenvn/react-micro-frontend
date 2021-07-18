import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import { motion } from 'framer-motion';
import reducer from './store';
import { selectWidgetsEntities, getWidgets } from './store/widgetsSlice';
import SellWidget from './widgets/SellWidget';
import InvoicesWidget from './widgets/InvoicesWidget';

function AnalyticsDashboardApp() {
	const dispatch = useDispatch();
	const widgets = useSelector(selectWidgetsEntities);

	useEffect(() => {
		dispatch(getWidgets());
	}, [dispatch]);

	if (_.isEmpty(widgets)) {
		return null;
	}

	const container = {
		show: {
			transition: {
				staggerChildren: 0.06
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<div className="w-full">
			<SellWidget data={widgets.SellWidget} />
			<motion.div
				className="flex flex-col md:flex-row sm:p-8 container"
				variants={container}
				initial="hidden"
				animate="show"
			>
				<div className="flex flex-1 flex-col min-w-0 pt-16">
					<Typography
						component={motion.div}
						variants={item}
						className="px-16 pb-8 text-18 font-normal"
						color="textSecondary"
					>
						How are your active users trending over time?
					</Typography>

					<div className="flex flex-col sm:flex sm:flex-row pb-32">
						<motion.div
							variants={item}
							className="widget flex w-full sm:w-1/3 p-16"
						>
							<InvoicesWidget data={widgets.InvoicesWidget} />
						</motion.div>
					</div>

					<Typography
						component={motion.div}
						variants={item}
						className="px-16 pb-8 text-18 font-normal"
						color="textSecondary"
					>
						How many pages your users visit?
					</Typography>

					<Typography
						component={motion.div}
						variants={item}
						className="px-16 pb-8 text-18 font-normal"
						color="textSecondary"
					>
						Where are your users?
					</Typography>
				</div>
			</motion.div>
		</div>
	);
}

export default withReducer(
	'analyticsDashboardApp',
	reducer
)(AnalyticsDashboardApp);
