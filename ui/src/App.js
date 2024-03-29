import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuBar from "./components/Menu";
import ChallengeSetPage from "./pages/ChallengeSetPage";
import EnvironmentPage from "./pages/EnvironmentPage";
import { useAuth0 } from "@auth0/auth0-react";
import UserNotAuthorized from "./pages/error-pages/userNotAuthorized";
import React from "react";
import ChallengeBar from "./components/AppBar";
import Home from "./pages/Home";
import leaderboard from "./pages/LeaderBoard";
/********************************************** Cipher Challenge Pages **************************************************************/
import CaeserCipher from "./pages/CaeserCipher"; //challengeSet1=caesar challenge
import LetterToNumber from "./pages/LetterToNumber";
import MorseCode from "./pages/MorseCode";
import ReverseCipher from "./pages/ReverseCipher";
import ComprehensiveChallenge from "./pages/ComprehensiveChallenge.js";
/********************************************** Web-Based Challenge Pages **************************************************************/
import DirectoryTraversal from "./pages/DirectoryTraversal";
import WebStructure from "./pages/WebStructure";
import Selection from "./pages/Selection";

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
                <Route path="/caesar" component={CaeserCipher} />
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
                <Route path="/challenge_1" component={CaeserCipher} />
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
