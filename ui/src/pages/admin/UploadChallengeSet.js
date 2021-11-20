import {useAuth0} from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import {useState} from "react";

export default function UploadChallengeSet() {
  const {isAuthenticated, getAccessTokenSilently} = useAuth0();
  const [file, setFile] = useState(null);

  if (!isAuthenticated) {
    return <div>
      <h1>Permission denied</h1>
    </div>;
  }

  return <div>
    <h1>Upload Challenge Set</h1>

    <Button
        variant="contained"
        component="label"
    >
      Choose File
      <input
          type="file"
          hidden
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
      />
    </Button>
    <Button variant="contained" onClick={async () => {
      let accessToken = await getAccessTokenSilently();

      let formData = new FormData();
      formData.append("file", file);

      fetch("/api/admin/challenge-sets", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
        body: formData,
      }).then((resp) => {
        if (resp.status >= 400) {
          window.alert(`Status >= 400: ${resp.status}`);
        } else {
          window.alert("Uploaded successfully!");
        }
      }).catch((e) => {
        window.alert(`Exception: ${e}`);
      })
    }}>
      Upload
    </Button>
  </div>;
}
