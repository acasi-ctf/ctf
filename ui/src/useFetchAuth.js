import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function useFetchAuth(url, method = "GET", body = {}) {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [running, setRunning] = useState(false);
	const { isAuthenticated, getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		async function init() {
			try {
				const accessToken = await getAccessTokenSilently();
				console.log(accessToken);

				const options = {
					method: method,
					headers: {
						"Authorization": `Bearer ${accessToken}`,
					}
				};
				switch (method) {
					case "POST":
					case "PUT":
					case "PATCH":
						options.body = JSON.stringify(body);
						options.headers["Content-Type"] = "application/json";
						break;
					default:
						break;
				}

				const response = await fetch(url, options);
				if (response.ok) {
					const json = await response.json();
					setData(json);
				} else {
					setError(response);
				}
			} catch (e) {
				setError(e);
			} finally {
				setLoading(false);
			}
		}

		if (isAuthenticated) {
			if (!running && loading) {
				setRunning(true);
				// noinspection JSIgnoredPromiseFromCall
				init();
			}
		}
	}, [url, method, body, getAccessTokenSilently, isAuthenticated, running, loading]);

	return { data, error, loading };
}
