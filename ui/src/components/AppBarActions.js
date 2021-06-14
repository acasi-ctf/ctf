import React from "react";
import Button from "@material-ui/core/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Tooltip, Dialog, DialogContent } from "@material-ui/core";
import useFetchAuth from "../useFetchAuth";

export default function AppBarActions() {
  const [open, setOpen] = React.useState(false);
  const { data: environments, loading, error } = useFetchAuth(
    "/api/user/environments"
  );
  const {
    user,
    loginWithPopup,
    logout,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  let buttonStyle = { marginLeft: "15px" };
  let authComponent = isAuthenticated ? (
    <>
      <Tooltip title="Logout" aria-label="logout">
        <Avatar
          src={user.picture}
          style={buttonStyle}
          onClick={() =>
            logout({
              returnTo: window.location.protocol + "//" + window.location.host,
            })
          }
        />
      </Tooltip>
    </>
  ) : (
    <>
      <Button
        variant="contained"
        color="white"
        disableElevation
        style={buttonStyle}
        onClick={() => loginWithPopup()}
      >
        Login
      </Button>
    </>
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <Button
        variant="contained"
        color="white"
        disableElevation
        href="https://wsu.co1.qualtrics.com/jfe/form/SV_88hZcsQMzabAMOq"
        target="_blank"
      >
        {" "}
        Report Issue
      </Button>

      <Button
        variant="contained"
        color="white"
        style={buttonStyle}
        disableElevation
        href="https://wsu.co1.qualtrics.com/jfe/form/SV_3HSX4XrAlj1L7mu"
        target="_blank"
      >
        {""}
        Anonymous Survey
      </Button>

      <Button
        variant="contained"
        color="white"
        style={buttonStyle}
        disableElevation
        onClick={handleClickOpen}
      >
        Show environments (Testing Purposes)
      </Button>

      <Dialog
        maxWidth={"md"}
        fullWidth={true}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          {environments.map((e) => {
            return (
              <>
                <p>{e.id}</p>
              </>
            );
          })}
        </DialogContent>
      </Dialog>

      {authComponent}
    </div>
  );
}
