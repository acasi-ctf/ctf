import React, { useState, useEffect } from 'react'
import '../style/LeaderBoard.css'


export default function Leaderboard(props) {
	const [dataLength, setDataLength] = useState(0);
	useEffect(()=>{
		fetch('/api/leaderboard')
		.then(res=>{
			var p = Promise.resolve(res.json());
			p.then(
				function(data){
					setDataLength(data.length)
					//sorting the data based on challengeCount (high > low)
					data.sort((a,b) => (a.challengeCount > b.challengeCount) ? -1 : ((b.challengeCount > a.challengeCount) ? 1 : 0))
					let idx;
					let table = document.getElementById('tableBody')
					for (idx=0; idx < data.length; idx++){
						let row = table.insertRow(idx);

						let rankInfo = row.insertCell(0);
						rankInfo.classList.add("rankColumn");
						rankInfo.innerHTML = (idx+1).toString()

						let playerInfo = row.insertCell(1);
						//playerInfo.innerHTML = data[idx].userName;
						playerInfo.innerHTML = (data[idx].userName!==null) ? data[idx].userName : data[idx].userId;
						playerInfo.classList.add("userColumn");

						let playerScore = row.insertCell(2);
						playerScore.innerHTML = data[idx].challengeCount.toString();
						playerScore.classList.add("scoreColumn");
					}
				}
			)
		});
	},[]);

    return (
        <div id="roundsModeTab" className="mode-page" role="tabpanel"
        aria-label="Rounds Tab" tabIndex="0">
            <h1 className="mode-page-header">Leaderboard</h1>
            <table id="roundsTable" className="table table-hover caption-top">
                <caption id="roundsTableCaption" aria-live="polite">
                {"Table displaying top " + dataLength  + " highest score player" +
                    (dataLength !== 1 ? "s" : "")}
                </caption>
                <thead className="table-light">
                    <tr>
                        <th scope="col" role="columnheader"
                            className="rankColumn sortable-header cell-align-middle"
                            aria-sort="none">
                            Rank
                        </th>

                        <th scope="col" role="columnheader"
                            className="userColumn sortable-header cell-align-middle"
                            aria-sort="none">
                            Player Name
                        </th>
                        <th scope="col" role="columnheader"
                            className="scoreColumn sortable-header cell-align-middle"
                            aria-sort="none">
                            Score
                        </th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                </tbody>
            </table>
        </div>
    )
}
