import { useSelector } from 'react-redux';
import VinScrollbars from '@vincore/core/VinScrollbars';
import { useTheme, ThemeProvider } from '@material-ui/core/styles';
import { selectContrastMainTheme } from 'app/store/common/settingsSlice';
import clsx from 'clsx';

function VinPageSimpleSidebarContent(props) {
	const theme = useTheme();
	const contrastTheme = useSelector(
		selectContrastMainTheme(theme.palette.primary.main)
	);

	const { classes } = props;

	return (
		<VinScrollbars enable={props.innerScroll}>
			{props.header && (
				<ThemeProvider theme={contrastTheme}>
					<div
						className={clsx(
							classes.sidebarHeader,
							props.variant,
							props.sidebarInner &&
								classes.sidebarHeaderInnerSidebar
						)}
					>
						{props.header}
					</div>
				</ThemeProvider>
			)}

			{props.content && (
				<div className={classes.sidebarContent}>{props.content}</div>
			)}
		</VinScrollbars>
	);
}

export default VinPageSimpleSidebarContent;
