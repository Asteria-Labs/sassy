import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

function PBar() {
  const now = 60;
  return <ProgressBar variant="secondary" now={now} label={`${now}%`} visuallyHidden />;
}

export default PBar;