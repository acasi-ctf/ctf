import React from 'react'
import '../style/LeaderBoard.css'
//end point API
//https://ctf.cyberliteracyforall.com/api/leaderboard
export default function leaderboard() {
    return (
        <div id="roundsModeTab" className="mode-page" role="tabpanel"
        aria-label="Rounds Tab" tabIndex="0">
            <h1 className="mode-page-header">Leaderboard</h1>
            <table id="roundsTable" className="table table-hover caption-top">
                <caption id="roundsTableCaption" aria-live="polite">
                {"Table displaying " + 0  + " speedgolf round" + 
                    (0 !== 1 ? "s" : "")}
                </caption>
                <thead className="table-light">
                    <tr>
                        <th scope="col" role="columnheader" 
                            className="sortable-header cell-align-middle" 
                            aria-sort="none">
                            <button className="btn bg-transparent table-sort-btn" 
                                    aria-label="Sort ascending by date">
                                {/* <FontAwesomeIcon icon="sort" />  */}
                            </button>Rank
                        </th>
                        <th scope="col" role="columnheader" 
                            className="sortable-header cell-align-middle" 
                            aria-sort="none">
                            <button className="btn bg-transparent table-sort-btn" 
                                    aria-label="Sort ascending by course">
                                {/* <FontAwesomeIcon icon="sort" />  */}
                            </button>Player
                        </th>
                        <th scope="col" role="columnheader"
                            className="sortable-header cell-align-middle"
                            aria-sort="none">
                            <button className="btn bg-transparent table-sort-btn" 
                                    aria-label="Sort ascending by score">
                                {/* <FontAwesomeIcon icon="sort" /> */}
                            </button>Score
                        </th>
                    </tr>
                </thead>
                <tbody>
                {"this.props.rounds" === null || 0 === 0 ? 
                    <tr>
                    <td colSpan="5" scope="rowgroup"><i>No rounds logged</i></td>
                    </tr> :<></>
                }
                </tbody>
            </table>        
        </div>
    )
}

