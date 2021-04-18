import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//ADD PAGES.
import Home from "./Page/Home";
import leaderboard from "./Page/LeaderBoard";
import ChallengeSet1 from "./Page/ChallengeSet1";
import Terminal from "./components/Terminal";
import MenuBar from "./components/Menu";
import ChallengeSets from "./Page/ChallengeSets";
import ErrorBoundary from "./Services/ErrorBoundary";

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <Router>
          <div className="App">
            <MenuBar />
            <div className="contentBackground">
              <div className="Content">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/LeaderBoard" component={leaderboard} />
                  <Route path="/ChallengeSets" component={ChallengeSets} />
                  <Route
                    path="/ChallengeSet1/challenge_1"
                    component={ChallengeSet1}
                  />
                </Switch>
              </div>
              <Terminal />
            </div>
          </div>
        </Router>
      </ErrorBoundary>
    </>
  );
}
