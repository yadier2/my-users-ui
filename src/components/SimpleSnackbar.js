import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Slide } from "@mui/material";

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

export default function SimpleSnackbar({ handleClick, handleClose, state }) {
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        TransitionComponent={(props) => <Slide {...props} direction="right" />}
        open={state.open}
        autoHideDuration={6000}
        onClose={handleClose}
        severity={state.severity || "error"}
        action={action}
      >
        <Alert severity={state.severity || "error"} sx={{ width: "100%" }}>
          {state.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
