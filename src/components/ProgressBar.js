import React from 'react';

function ProgressBar({current, total, barWidth}) {

  function progressBarWidth() {
    if (total === 0 ) {
      return 0;
    } else {
      return Math.ceil( current / total * barWidth);
    }
  }

  return(
    <div className="progressBar">
      <div className="fill" style={{width: progressBarWidth()}}></div>
    </div>    
  )
}

export default ProgressBar;
