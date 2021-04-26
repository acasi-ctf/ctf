import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuBar from "./components/Menu";
import ChallengeSetPage from "./pages/ChallengeSetPage";
import EnvironmentPage from "./pages/EnvironmentPage";
import { useAuth0 } from "@auth0/auth0-react";
import UserNotAuthorized from "./pages/error-pages/userNotAuthorized";
import React from "react";
import ChallengeBar from "./components/AppBar";
import Home from "./Page/Home";
import leaderboard from "./Page/LeaderBoard";
/********************************************** Cipher Challenge Pages **************************************************************/
import ChallengeSet1 from "./Page/ChallengeSet1"; //challengeSet1=caesar challenge
import LetterToNumber from "./Page/LetterToNumber";
import MorseCode from "./Page/MorseCode";
import ReverseCipher from "./Page/ReverseCipher";
import ComprehensiveChallenge from "./Page/ComprehensiveChallenge.js";
/********************************************** Web-Based Challenge Pages **************************************************************/
import DirectoryTraversal from "./Page/DirectoryTraversal";
import WebStructure from "./Page/WebStructure";
import Selection from "./Page/Selection";
import MenuBar from "./components/Menu";

export default function App() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

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
                <Route path="/caesar" component={ChallengeSet1} />
                <Route path="/letter-to-number" component={LetterToNumber} />
                <Route path="/morse-code" component={MorseCode} />
                <Route path="/reverse-cipher" component={ReverseCipher} />
                <Route
                  path="/comprehensive-challenge"
                  component={ComprehensiveChallenge}
                />
                <Route
                  path="/directory-traversal"
                  component={DirectoryTraversal}
                />
                <Route path="/web-structure" component={WebStructure} />
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
