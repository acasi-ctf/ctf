import React from 'react'
import '../style/LeaderBoard.css'

export default function leaderboard() {
    return (
            <div id="roundsModeTab" className="mode-page" role="tabpanel"
            aria-label="Rounds Tab" tabIndex="0">
        <h1 className="mode-page-header">Rounds</h1>
        <table id="roundsTable" className="table table-hover caption-top">
            <caption id="roundsTableCaption" aria-live="polite">
            {"Table displaying " + this.props.rounds.length  + " speedgolf round" + 
                (this.props.rounds.length !== 1 ? "s" : "")}
            </caption>
            <thead className="table-light">
            <tr>
            <th scope="col" role="columnheader" 
                className="sortable-header cell-align-middle" 
                aria-sort="none">
                <button className="btn bg-transparent table-sort-btn" 
                        aria-label="Sort ascending by date">
                    <FontAwesomeIcon icon="sort" /> 
                </button>Date
            </th>
            <th scope="col" role="columnheader" 
                className="sortable-header cell-align-middle" 
                aria-sort="none">
                <button className="btn bg-transparent table-sort-btn" 
                        aria-label="Sort ascending by course">
                    <FontAwesomeIcon icon="sort" /> 
                </button>Course
            </th>
            <th scope="col" role="columnheader"
                className="sortable-header cell-align-middle"
                aria-sort="none">
                <button className="btn bg-transparent table-sort-btn" 
                        aria-label="Sort ascending by score">
                    <FontAwesomeIcon icon="sort" />
                </button>Score
            </th>
            <th scope="col" className="cell-align-middle">
                View/Edit...
            </th>
            <th scope="col" className="cell-align-middle">
                Delete
            </th>
            </tr>
            </thead>
            <tbody>
            {this.props.rounds === null || this.props.rounds.length === 0 ? 
                <tr>
                <td colSpan="5" scope="rowgroup"><i>No rounds logged</i></td>
                </tr> : this.renderTable()
            }
            </tbody>
        </table>        
        </div>
    )
}

