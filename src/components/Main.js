import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import localforage from 'localforage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// const authRoutes = ['/gameplay', '/gameover'];
// const publicRoutes = ['/'];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
		this.checkLogin();
	}

	checkLogin() {
		let currentLocation = this.props.router.getCurrentLocation().pathname;
		// console.log(currentLocation);
		localforage.getItem('playerName')
			.then((value) => {
				if (value !== null && value !== "") {
					// console.log("PlayerName set in storage as: ", value);
					if (currentLocation === "/") {
						browserHistory.push("/gameplay");
					}
				}
			}).catch((err) => {
				console.log("PlayerName not set");
				if (currentLocation === "/gameplay") {
					browserHistory.push("/");
				}
			})
	}

	render() {
		// muiTheme={getMuiTheme(darkBaseTheme)}
		return (
			<MuiThemeProvider key="themeProvider">
				<div className="container" key="container">
					{this.props.children}
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
