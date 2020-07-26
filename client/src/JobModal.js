import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function JobModal({ job, open, handleClose }) {
  if (!job.title) {
    return <div />;
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {job.title}
          <img
            src={job.company_logo}
            className="detail-logo"
            alt="company-logo"
          />
          <br></br>
          <Typography variant="h5">{job.company}</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            dangerouslySetInnerHTML={{ __html: job.description }}
          ></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="secondary"
            size="small"
            variant="contained"
          >
            Close
          </Button>
          <a href={job.url} target="__blank">
            <Button color="primary" variant="contained" size="small">
              Apply
            </Button>
          </a>
        </DialogActions>
      </Dialog>
    </div>
  );
}
