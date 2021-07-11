import VinScrollbars from '@vincore/core/VinScrollbars';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import * as PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle, memo, useRef } from 'react';
import VinPageSimpleHeader from './VinPageSimpleHeader';
import VinPageSimpleSidebar from './VinPageSimpleSidebar';

const headerHeight = 120;
const toolbarHeight = 64;
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	'@global': {
		'#vin-main': {
			height: props => props.innerScroll && '100vh'
		}
	},
	root: {
		display: 'flex',
		flexDirection: 'column',
		minWidth: 0,
		minHeight: '100%',
		position: 'relative',
		flex: '1 1 auto',
		height: 'auto',
		backgroundColor: theme.palette.background.default
	},
	innerScroll: {
		height: '100%'
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		flex: '1 1 auto',
		zIndex: 2,
		maxWidth: '100%',
		minWidth: 0,
		height: '100%',
		backgroundColor: theme.palette.background.default
	},
	header: {
		height: headerHeight,
		minHeight: headerHeight,
		display: 'flex',
		background: `linear-gradient(to right, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
		color: theme.palette.primary.contrastText,
		backgroundSize: 'cover',
		backgroundColor: theme.palette.primary.dark
	},
	topBg: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: headerHeight,
		pointerEvents: 'none'
	},
	/* contentCardWrapper            : {
         display : 'flex ',
         flex    : '1 1 auto',
         overflow: 'visible!important',
         minWidth: 0,
         '&.ps'  : {
             overflow: 'visible!important'
         }
     },
     contentCardWrapperInnerSidebar: {
         display                     : 'block',
         overflow                    : 'auto!important',
         '-webkit-overflow-scrolling': 'touch',
         '&.ps'                      : {
             overflow: 'hidden!important'
         },
         '& $contentCard'            : {
             borderRadius: 8
         }
     }, */
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 auto',
		overflow: 'auto',
		'-webkit-overflow-scrolling': 'touch',
		zIndex: 9999
	},
	toolbar: {
		height: toolbarHeight,
		minHeight: toolbarHeight,
		display: 'flex',
		alignItems: 'center'
	},
	content: {
		flex: '1 0 auto'
	},
	sidebarWrapper: {
		overflow: 'hidden',
		backgroundColor: 'transparent',
		position: 'absolute',
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				position: 'relative'
			}
		}
	},
	sidebar: {
		position: 'absolute',
		'&.permanent': {
			[theme.breakpoints.up('lg')]: {
				backgroundColor: theme.palette.background.default,
				color: theme.palette.text.primary,
				position: 'relative'
			}
		},
		width: drawerWidth,
		height: '100%'
	},
	leftSidebar: {
		[theme.breakpoints.up('lg')]: {
			borderRight: `1px solid ${theme.palette.divider}`,
			borderLeft: 0
		}
	},
	rightSidebar: {
		[theme.breakpoints.up('lg')]: {
			borderLeft: `1px solid ${theme.palette.divider}`,
			borderRight: 0
		}
	},
	sidebarHeader: {
		height: headerHeight,
		minHeight: headerHeight,
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.primary.contrastText
	},
	sidebarHeaderInnerSidebar: {
		backgroundColor: 'transparent',
		color: 'inherit',
		height: 'auto',
		minHeight: 'auto'
	},
	sidebarContent: {},
	backdrop: {
		position: 'absolute'
	}
}));

const VinPageSimple = forwardRef((props, ref) => {
	// console.info("render::VinPageSimple");
	const leftSidebarRef = useRef(null);
	const rightSidebarRef = useRef(null);
	const rootRef = useRef(null);
	const classes = useStyles(props);

	useImperativeHandle(ref, () => ({
		rootRef,
		toggleLeftSidebar: () => {
			leftSidebarRef.current.toggleSidebar();
		},
		toggleRightSidebar: () => {
			rightSidebarRef.current.toggleSidebar();
		}
	}));

	return (
		<div
			className={clsx(
				classes.root,
				props.innerScroll && classes.innerScroll
			)}
			ref={rootRef}
		>
			<div className={clsx(classes.header, classes.topBg)} />

			<div className="flex flex-auto flex-col container z-10 h-full">
				{props.header && props.sidebarInner && (
					<VinPageSimpleHeader
						header={props.header}
						classes={classes}
					/>
				)}

				<div className={classes.wrapper}>
					{(props.leftSidebarHeader || props.leftSidebarContent) && (
						<VinPageSimpleSidebar
							position="left"
							header={props.leftSidebarHeader}
							content={props.leftSidebarContent}
							variant={props.leftSidebarVariant || 'permanent'}
							innerScroll={props.innerScroll}
							sidebarInner={props.sidebarInner}
							classes={classes}
							ref={leftSidebarRef}
							rootRef={rootRef}
						/>
					)}

					{/* <VinScrollbars */}
					{/*    className={clsx(classes.contentCardWrapper, props.sidebarInner && classes.contentCardWrapperInnerSidebar)} */}
					{/*    enable={props.innerScroll && props.sidebarInner} */}
					{/* > */}
					<VinScrollbars
						className={classes.contentWrapper}
						enable={props.innerScroll && !props.sidebarInner}
					>
						{props.header && !props.sidebarInner && (
							<VinPageSimpleHeader
								header={props.header}
								classes={classes}
							/>
						)}

						{props.contentToolbar && (
							<div className={classes.toolbar}>
								{props.contentToolbar}
							</div>
						)}

						{props.content && (
							<div className={classes.content}>
								{props.content}
							</div>
						)}
					</VinScrollbars>
					{/* </VinScrollbars> */}

					{(props.rightSidebarHeader ||
						props.rightSidebarContent) && (
						<VinPageSimpleSidebar
							position="right"
							header={props.rightSidebarHeader}
							content={props.rightSidebarContent}
							variant={props.rightSidebarVariant || 'permanent'}
							innerScroll={props.innerScroll}
							sidebarInner={props.sidebarInner}
							classes={classes}
							ref={rightSidebarRef}
							rootRef={rootRef}
						/>
					)}
				</div>
			</div>
		</div>
	);
});

VinPageSimple.propTypes = {
	leftSidebarHeader: PropTypes.node,
	leftSidebarContent: PropTypes.node,
	leftSidebarVariant: PropTypes.node,
	rightSidebarHeader: PropTypes.node,
	rightSidebarContent: PropTypes.node,
	rightSidebarVariant: PropTypes.node,
	header: PropTypes.node,
	content: PropTypes.node,
	contentToolbar: PropTypes.node,
	sidebarInner: PropTypes.bool,
	innerScroll: PropTypes.bool
};

VinPageSimple.defaultProps = {};

export default memo(VinPageSimple);
