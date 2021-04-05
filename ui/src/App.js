import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PermanentDrawerLeft from "./components/Menu";

//ADD PAGES.
import Home from './Page/Home';
import leaderboard from './Page/LeaderBoard';
import ChallengeSet1 from './Page/ChallengeSet1';
import Terminal from './Terminal';


export default function App() {
    return (
        <>
            <Router>
                <div className='App'>
                    <PermanentDrawerLeft/>
                    <div className='contentBackground'>
                        <div className='Content'>
                            <Switch>
                                <Route path='/' exact component={Home}/>
                                <Route path='/LeaderBoard'
                                       component={leaderboard}/>
                                <Route path='/ChallengeSet1'
                                       component={ChallengeSet1}/>
                            </Switch>
                        </div>
                    </div>

                    {/* UNCOMMENT THIS TO TURN ON THE TERMINAL */}
                    <Terminal/>

                </div>
            </Router>
        </>
    );
}

