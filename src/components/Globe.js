import React from 'react';
import Globe from 'react-globe.gl';

import earthNight from '../assets/earth-night.jpg';
import nightSky from '../assets/night-sky.png';

export default ({
}) => {
  const globeEl = React.useRef();

  React.useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.1;
  }, [true]);

  return (
    <Globe
      ref={globeEl}
      globeImageUrl={earthNight}
      backgroundImageUrl={nightSky}
    />
  );
};