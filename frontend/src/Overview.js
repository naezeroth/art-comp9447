import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';

class Overview extends Component {
	render(){
		return(
			<div>
				<div>
					<AppBar style={styles.title}>
						<Toolbar>
							<div style={styles.headerBar}>
								<div style={styles.leftBlock}> <CloudQueueIcon /></div>
								<div style={styles.leftBlock}><Typography variant="h6">ART</Typography></div>
								<div align="right"><Button style={styles.acName}>AccountName</Button></div>
							</div>
						</Toolbar>
					</AppBar>
				</div>
				<div>
					<AppBar style={styles.dropDown}>
						<Toolbar>
						</Toolbar>
					</AppBar>
				</div>
				<Container disableGutters="true" maxWidth="false">
        	<Typography component="div" style={{ backgroundColor: '#C4C4C4', height: '100vh' }}>
						<Container maxWidth="xl">
							<Typography component="div" style={{ backgroundColor: '#F1FAFF', height: '100vh' }}>
								data
							</Typography>
						</Container>
					</Typography>
					
      	</Container>

			</div>
		);
	}
}



const styles =  {

	title: {
		backgroundColor: '#12293B',
		position:"static",
	},

	headerBar:{
		display:"flex",
		justifyContent: "space-between",
		flexFlow: "row wrap",
	},

	leftBlock: {
		paddingRight: 10,
		flexGrow: 1,
	},

	rightBlock :{
		flex : 2,
	},

	acName: {
		color:"inherit",
	},

	dropDown: {
		backgroundColor: '#567DA5',
		position:"static",
	},

	mainBody: {
		backgroundColor: '#C4C4C4',
	}

};

export default Overview;