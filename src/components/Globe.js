import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

import earthNight from '../assets/earth-night.jpg';
import nightSky from '../assets/night-sky.png';
import worldMap from '../datasets/world.geojson';

export default ({
}) => {
  const globeEl = React.useRef();

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.1;

    fetch(worldMap).then(res => res.json()).then(setCountries);
  }, [true]);

  return (
    <Globe
      ref={globeEl}
      animateIn
      waitForGlobeReady
      globeImageUrl={earthNight}
      backgroundImageUrl={nightSky}

      polygonsData={countries.features}
      polygonAltitude={d => d === hoverD ? 0.12 : 0.06}
      polygonCapColor={d => d === 'rgb(255,255,255)'}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonStrokeColor={() => '#111'}
      polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
        GDP: <i>${d.GDP_MD_EST}</i> M$<br/>
        Population: <i>${d.POP_EST}</i>
      `}
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
    />
  );
};