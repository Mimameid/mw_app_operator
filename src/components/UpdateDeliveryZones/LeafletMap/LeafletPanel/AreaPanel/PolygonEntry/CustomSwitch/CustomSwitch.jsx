import React from 'react';
import { Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = (props) => {
  return makeStyles((theme) => ({
    switchEnabled: {
      '& span': {
        color: props.color,
      },
      '& .MuiSwitch-track': {
        backgroundColor: `${props.color} !important`,
      },
    },
    switchDisabled: {
      '& span': {
        color: props.color,
      },
    },
  }));
};

function CustomSwitch({ color, areaNumber, currentAreaNumber, handleActivateArea }) {
  const classes = useStyles({ color })();

  return (
    <Switch
      className={`${areaNumber === currentAreaNumber ? classes.switchEnabled : classes.switchDisabled} `}
      checked={areaNumber === currentAreaNumber}
      onChange={(event) => handleActivateArea(event, areaNumber)}
      name="checkedA"
      // style={{ color: color }}
      size="small"
    />
  );
}

export default CustomSwitch;
