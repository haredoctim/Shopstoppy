import React from 'react';

// Reusable background decoration component
const BackgroundDecoration = () => (
  <div className="background-decoration">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
      {[20, 30, 40, 50, 60, 70, 80, 90].map(y => (
        <path key={y} d={`M0,${y} Q25,${y-20} 50,${y} T100,${y}`} stroke="#c3a080" strokeWidth="1" fill="none" />
      ))}
    </svg>
  </div>
);

export default BackgroundDecoration;