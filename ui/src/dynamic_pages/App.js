import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChallengeSets from "./Pages/ChallengeSets";
import { useState } from "react";

export default function App() {
  const [challengeSet, setChallengeSet] = useState([]);

  return (
    <>
      <div className="App">
        <main>
          <Router>
            <Route path="/" component={ChallengeSets} />
            <Route path="/:challengeSet/:challenge" />
          </Router>
        </main>
      </div>
    </>
  );
}
