import React from 'react';
import classes from './HelpMessageButton.module.scss';

const HelpMessageButton = ({ message }: { message: string }) => {
  return <div className={classes['help-message']}>{message}</div>;
};

export default HelpMessageButton;
