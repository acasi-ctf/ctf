import "./style/App.css";
import {useHistory} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import MenuBar from "./components/Menu";
import { useAuth0 } from "@auth0/auth0-react";
import UserNotAuthorized from "./pages/error-pages/userNotAuthorized";
import ChallengeBar from "./components/AppBar";
/********************************************** Three Static Pages **************************************************************/
import Selection from "./pages/Selection.js"
import Home from "./pages/Home";
import leaderboard from "./pages/LeaderBoard";
/********************************************** Dynamic Pages **************************************************************/
import ChallengePage from "./pages/ChallengePage";
/***************************************************************************************************************************************/

export default function App() {
	const history = useHistory();
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	useEffect(() => {
		if (performance.navigation.type === 1) {
			history.push('/');
		}
	});


	if (!isAuthenticated)
		return (
			<>
				<div>
				<ChallengeBar name="Welcome to Capture the Flag" />
				<UserNotAuthorized />
				</div>
			</>
		);


	return (
		<Router>
			<div className="App">
				<MenuBar />
				<div className="container-fluid mt-110">
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/LeaderBoard" component={leaderboard} />
						<Route path="/selection" component={Selection} />
						{/* Challenge Sets pages */}
						<Route path="/play/:csSlug/:cSlug">
							<ChallengePage />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}
