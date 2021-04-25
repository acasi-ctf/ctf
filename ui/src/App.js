import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import PermanentDrawerLeft from "./components/Menu";

//ADD PAGES.
import Home from "./pages/Home";
import leaderboard from "./pages/LeaderBoard";
import ChallengeSet1 from "./pages/ChallengeSet1";
import Selection from "./pages/Selection";

import MenuBar from "./components/Menu";
import ChallengeSetPage from "./pages/ChallengeSetPage";
import EnvironmentPage from "./pages/EnvironmentPage";

export default function App() {
  return (
    <>
      <Router>
        <div className="App">
          <MenuBar />
          <div className="contentBackground">
            <div className="Content">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/LeaderBoard" component={leaderboard} />
                <Route path="/selection" component={Selection} />
                <Route path="/challenge_1" component={ChallengeSet1} />
                <Route path="/set/:cs_slug" component={ChallengeSetPage} />
                <Route path="/env/:env_id" component={EnvironmentPage} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}
