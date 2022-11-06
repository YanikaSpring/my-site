import React from 'react';

const LoadingScreen = () => {

  return <div style={{'width': `100%`, 'height': `900px`, 'display': `flex`, 'alignItems': `center`, 'justifyContent': `center`}}>
    <div className='loader' style={{
      "borderTop": `16px solid blue`, "borderRight": `16px solid green`, "borderBottom": `16px solid red`, "borderLeft": `16px solid pink`,
      "borderRadius": `50%`,
      'width': `200px`, 'height': `200px`
    }}></div>
  </div>;
};

export default LoadingScreen;
