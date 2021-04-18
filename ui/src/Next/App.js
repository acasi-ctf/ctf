import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChallengeSets from "./Pages/ChallengeSets";

import ErrorBoundary from "./Services/ErrorBoundary";

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <Router>
          <div className="App">
            <ChallengeSets />
          </div>
        </Router>
      </ErrorBoundary>
    </>
  );
}
