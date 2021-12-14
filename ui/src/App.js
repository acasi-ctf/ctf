import "./style/App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import MenuBar from "./components/Menu";
import {useAuth0} from "@auth0/auth0-react";
import PreLoginPage from "./pages/error-pages/preLoginPage";
import ChallengeBar from "./components/AppBar";
/********************************************** Three Static Pages **************************************************************/
import Selection from "./pages/Selection.js"
import SelectionDetail from "./pages/SelectionDetail";
import Home from "./pages/Home";
import leaderboard from "./pages/LeaderBoard";
import Pentesting from "./pages/Pentesting";
import Games from "./pages/Games";
import Ciphers from "./pages/Ciphers";
import UploadChallengeSet from "./pages/admin/UploadChallengeSet";
/********************************************** Dynamic Pages *******************************************************************/
import ChallengePage from "./pages/ChallengePage";
import StartChallengePage from "./pages/StartChallengePage";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {reducer} from "./state";

const store = createStore(reducer);

export default function App() {
  const {isAuthenticated} = useAuth0();
  if (!isAuthenticated) {
    return <Provider store={store}>
      <div>
        <ChallengeBar name="Welcome to Cyber Literacy For All"/>
        <PreLoginPage/>
      </div>
    </Provider>;
  }

  return <Provider store={store}>
    <Router>
      <div className="App">
        <MenuBar/>
        <div className="container-fluid mt-110">
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/LeaderBoard" component={leaderboard}/>
            <Route path="/selection" component={Selection}/>
            <Route path="/pentesting" component={Pentesting}/>
            <Route path="/games" component={Games}/>
            <Route path="/ciphers" component={Ciphers}/>
            {/* Challenge Sets pages */}
            <Route path="/play/:csSlug/:cSlug">
              <StartChallengePage/>
            </Route>
            <Route path="/env/:csSlug/:cSlug/:envId">
              <ChallengePage/>
            </Route>
            <Route path="/selection-detail/:csSlug">
              <SelectionDetail/>
            </Route>

            {/* Administration pages */}
            <Route path="/admin/upload" component={UploadChallengeSet}/>
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>;
}
