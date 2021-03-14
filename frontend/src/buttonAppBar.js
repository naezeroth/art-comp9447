// Some code appropriated from https://material-ui.com/components/app-bar/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import AccountCircle from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	backG:{
		backgroundColor: '#12293B',
		position:"static",
	},
	title: {
		flexGrow: 1,
	},
}));

export default function ButtonAppBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar className={classes.backG}>
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<CloudQueueIcon/>
					</IconButton>
					<Typography variant="h6">
						ART
					</Typography>
					<Typography variant="h6" className={classes.title}>
						{/* Here to make sure that the flexing works properly */}
					</Typography>
					<IconButton color="inherit">
						<AccountCircle />
					</IconButton>
					<Button color="inherit" >AccountName</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}