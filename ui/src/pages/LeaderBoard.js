import React, { useEffect } from 'react'
import '../style/LeaderBoard.css'


export default function Leaderboard(props) {
	useEffect(()=>{
		fetch('/api/leaderboard')
		.then(res=>{var p = Promise.resolve(res.json());
								p.then(
									function(data){
										let idx;
										let table = document.getElementById('tableBody')
										for (idx=0; idx < data.length; idx++){
											let row = table.insertRow(idx);

											let rankInfo = row.insertCell(0);
											rankInfo.classList.add("rankColumn");
											rankInfo.innerHTML = idx.toString()
											// rankInfo.innerHTML = "<div id=rI-"+idx.toString()+">"+idx.toString()+"</div>";

											
											let playerInfo = row.insertCell(1);
											playerInfo.innerHTML = data[idx].userId;
											playerInfo.classList.add("userColumn");


											let playerScore = row.insertCell(2);
											playerScore.innerHTML = data[idx].challengeCount.toString();
											playerScore.classList.add("scoreColumn");
										}
									}
								)
							}
					)
	});

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
                            className="rankColumn sortable-header cell-align-middle" 
                            aria-sort="none">
                            <button className="btn bg-transparent table-sort-btn" 
                                    aria-label="Sort ascending by date">
                            </button>Rank
                        </th>
                        
                        <th scope="col" role="columnheader" 
                            className="userColumn sortable-header cell-align-middle" 
                            aria-sort="none">
                            <button className="btn bg-transparent table-sort-btn" 
                                    aria-label="Sort ascending by course">
                            </button>Player
                        </th>
                        <th scope="col" role="columnheader"
                            className="scoreColumn sortable-header cell-align-middle"
                            aria-sort="none">
                            <button className="btn bg-transparent table-sort-btn" 
                                    aria-label="Sort ascending by score">
                            </button>Score
                        </th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                </tbody>
            </table>        
        </div>
    )
}

