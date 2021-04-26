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
        const response = await fetch(url, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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
  }, [url, getAccessTokenSilently, isAuthenticated, running, loading]);

  return { data, error, loading };
}
