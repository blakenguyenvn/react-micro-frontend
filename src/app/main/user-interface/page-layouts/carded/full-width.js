import DemoContent from '@vincore/core/DemoContent';
import VinPageCarded from '@vincore/core/VinPageCarded';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	layoutRoot: {}
});

function CardedFullWidthSample() {
	const classes = useStyles();

	return (
		<VinPageCarded
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="py-24">
					<h4>Header</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<h4>Content Toolbar</h4>
				</div>
			}
			content={
				<div className="p-24">
					<h4>Content</h4>
					<br />
					<DemoContent />
				</div>
			}
		/>
	);
}

export default CardedFullWidthSample;
