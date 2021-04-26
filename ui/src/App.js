import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import PermanentDrawerLeft from "./components/Menu";

//ADD PAGES.
import Home from './Page/Home';
import leaderboard from './Page/LeaderBoard';
/********************************************** Cipher Challenge Pages **************************************************************/
import ChallengeSet1 from './Page/ChallengeSet1';//challengeSet1=caesar challenge
import LetterToNumber from './Page/LetterToNumber';
import MorseCode from './Page/MorseCode';
import ReverseCipher from './Page/ReverseCipher';
import ComprehensiveChallenge from './Page/ComprehensiveChallenge.js';
/********************************************** Web-Based Challenge Pages **************************************************************/
import DirectoryTraversal from './Page/DirectoryTraversal';
import WebStructure from './Page/WebStructure';

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
                                <Route path='/caesar' component={ChallengeSet1}/>
                                <Route path='/letter-to-number' component={LetterToNumber}/>
                                <Route path='/morse-code' component={MorseCode}/>
                                <Route path='/reverse-cipher' component={ReverseCipher}/>
                                <Route path='/comprehensive-challenge' component={ComprehensiveChallenge}/>
                                <Route path='/directory-traversal' component={DirectoryTraversal}/>
                                <Route path='/web-structure' component={WebStructure}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        </>
);
}

