import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import PermanentDrawerLeft from "./components/Menu";

//ADD PAGES.
import Home from './Page/Home';
import leaderboard from './Page/LeaderBoard';
import ChallengeSet1 from './Page/ChallengeSet1';
import Selection from './Page/Selection';

import MenuBar from './components/Menu';


export default function App() {
  return (
        <>
            <Router>
                <div className='App'>
                    <MenuBar/>
                    <div className='contentBackground'>
                        <div className='Content'>
                            <Switch>
                                <Route path='/' exact component={Home}/>
                                <Route path='/LeaderBoard' component={leaderboard}/>
                                <Route path='/selection' component={Selection}/>
                                <Route path='/challenge_1' component={ChallengeSet1}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        </>
);
}

