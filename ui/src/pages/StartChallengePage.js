import React, { useEffect } from "react";
import "../style/ChallengePage.css";

import { useAuth0 } from "@auth0/auth0-react";
import {useHistory, useParams} from "react-router-dom";
import fetchAuth from "../util/fetchAuth";
import Spinner from "../components/Spinner";

export default function StartChallengePage() {
	const {csSlug, cSlug} = useParams();
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();
	const history = useHistory();

	useEffect(() => {
		async function startEnvironment() {
			let accessToken = await getAccessTokenSilently();
			let response = await fetchAuth("/api/user/environments", accessToken, "POST", {
				"challengeSetSlug" :`${csSlug}`,
				"challengeSlug"  :`${cSlug}`
			});
			response.json().then((json) => {
				history.replace(`/env/${csSlug}/${cSlug}/${json.id}`);
			});
		}

		if (isAuthenticated) {
			startEnvironment();
		}
	}, [ isAuthenticated, getAccessTokenSilently, csSlug, cSlug, history ]);

	if (isAuthenticated) {
		return <div style={{
			width: "100%",
			paddingTop: "50px",
			textAlign: "center"
		}}>
			<Spinner/>
			<p>Starting environment...</p>
		</div>;
	} else {
		return <div>
			Not authenticated
		</div>
	}
}
