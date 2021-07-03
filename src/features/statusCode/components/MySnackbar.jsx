/* eslint-disable react/no-did-update-set-state */

import React from 'react';
import STATUS_CODE from 'constants';

import { Snackbar, SnackbarContent, Slide, withStyles } from '@material-ui/core';
import { CheckCircle, Error, Info, Warning } from '@material-ui/icons';

function TransitionDown(props) {
  return <Slide {...props} direction="left" />;
}

function getOptions(type) {
  let Icon;
  let statusName;
  switch (type) {
    case STATUS_CODE.ERROR:
      Icon = Error;
      statusName = 'error';
      break;
    case STATUS_CODE.WARNING:
      Icon = Warning;
      statusName = 'warning';
      break;
    case STATUS_CODE.SUCCESS:
      Icon = CheckCircle;
      statusName = 'success';
      break;
    case STATUS_CODE.INFO:
      Icon = Info;
      statusName = 'info';
      break;
    default:
      Icon = null;
      statusName = '';
  }
  return { Icon, statusName };
}

const styles = (theme) => ({
  snackbarContentSuccess: {
    backgroundColor: '#4caf50',
  },
  snackbarContentError: {
    backgroundColor: '#f44336',
  },
  snackbarContentInfo: {
    backgroundColor: '#00acc1',
  },
  snackbarContentWarning: {
    backgroundColor: '#ffa000',
  },
  snackbarContentIcon: {
    fontSize: '20px',
    opacity: 0.9,
    marginRight: '1rem',
  },
  snackbarContentMessage: {
    display: 'flex',
    alignItems: 'center',
  },
});

class MySnackBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.createSnackInfo = this.createSnackInfo.bind(this);
    this.handleExited = this.handleExited.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { count } = this.props;
    const { open } = this.state;

    if (prevProps.count !== count) {
      // Reset and set timout to close snackbar
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.setState({ open: false }), 3000);

      this.newSnack = this.createSnackInfo();

      if (open) {
        // immediately begin dismissing current message
        // to start showing new one
        this.setState({ open: false });
      } else {
        this.setState({ currentSnack: this.newSnack });
        this.newSnack = null;
        this.setState({ open: true });
      }
    }
  }

  createSnackInfo() {
    const { type, message } = this.props;

    const { Icon, statusName } = getOptions(type);
    return { Icon, statusName, message };
  }

  handleExited() {
    if (this.newSnack) {
      this.setState({ currentSnack: this.newSnack });
      this.newSnack = null;
      this.setState({ open: true });
    }
  }

  render() {
    const { currentSnack, open } = this.state;

    if (!currentSnack) {
      return null;
    }
    const { classes } = this.props;
    let contentClassName = '';

    switch (currentSnack.statusName) {
      case 'error':
        contentClassName = classes.snackbarContentError;
        break;
      case 'success':
        contentClassName = classes.snackbarContentSuccess;
        break;
      case 'warning':
        contentClassName = classes.snackbarContentWarning;
        break;
      case 'info':
        contentClassName = classes.snackbarContentInfo;
        break;
      default:
        contentClassName = classes.snackbarContentInfo;
    }
    const { Icon } = currentSnack;
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        TransitionComponent={TransitionDown}
        transitionDuration={{ enter: 200, exit: 200 }}
        onExited={this.handleExited}
        disableWindowBlurListener
      >
        <SnackbarContent
          className={contentClassName}
          aria-describedby="status-snackbar"
          message={
            <span className={classes.snackbarContentMessage}>
              {<Icon className={classes.snackbarContentIcon} />}
              {currentSnack.message}
            </span>
          }
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles)(MySnackBar);
