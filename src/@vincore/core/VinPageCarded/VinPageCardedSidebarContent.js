import VinScrollbars from '@vincore/core/VinScrollbars';
import { useTheme, ThemeProvider } from '@material-ui/core/styles';
import { selectContrastMainTheme } from 'app/store/common/settingsSlice';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

function VinPageCardedSidebarContent(props) {
	const theme = useTheme();
	const contrastTheme = useSelector(
		selectContrastMainTheme(theme.palette.primary.main)
	);

	const { classes } = props;

	return (
		<>
			{props.header && (
				<ThemeProvider theme={contrastTheme}>
					<div className={clsx(classes.sidebarHeader, props.variant)}>
						{props.header}
					</div>
				</ThemeProvider>
			)}

			{props.content && (
				<VinScrollbars
					className={classes.sidebarContent}
					enable={props.innerScroll}
				>
					{props.content}
				</VinScrollbars>
			)}
		</>
	);
}

export default VinPageCardedSidebarContent;
