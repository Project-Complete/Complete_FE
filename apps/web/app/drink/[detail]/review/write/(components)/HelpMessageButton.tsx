import React from 'react';
import classes from './HelpMessageButton.module.scss';

const HelpMessageButton = () => {
  return (
    <button className={classes['help-message']} type='button'>
      Help Message
    </button>
  );
};

export default HelpMessageButton;
