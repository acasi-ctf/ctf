import "./style/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import MenuBar from "./components/Menu";
import { useAuth0 } from "@auth0/auth0-react";
import PreLoginPage from "./pages/error-pages/preLoginPage";
import ChallengeBar from "./components/AppBar";
/********************************************** Three Static Pages **************************************************************/
import Selection from "./pages/Selection.js"
import Home from "./pages/Home";
import leaderboard from "./pages/LeaderBoard";
/********************************************** Dynamic Pages *******************************************************************/
import ChallengePage from "./pages/ChallengePage";
import StartChallengePage from "./pages/StartChallengePage";

export default function App() {
	const { isAuthenticated } = useAuth0();
	if (!isAuthenticated){
		return (
			<>
				<div>
				<ChallengeBar name="Welcome to Cyber Literacy for All" />
				<PreLoginPage />
				</div>
			</>
		);
	}


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
							<StartChallengePage />
						</Route>
						<Route path="/env/:csSlug/:cSlug/:envId">
							<ChallengePage />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}
