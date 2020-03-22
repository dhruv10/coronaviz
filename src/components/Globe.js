import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

import earthNight from '../assets/earth-night.jpg';
import nightSky from '../assets/night-sky.png';
import worldMap from '../datasets/world.geojson';

const tooltipInfo = (d, data) => {
  const hoveredCountry = data.filter((i) => i.country.toLowerCase() === d.ADMIN.toLowerCase() || i.country.toLowerCase() === d.BRK_A3.toLowerCase())[0];

  if (!hoveredCountry) return (`
    <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
    Population: <i>${d.POP_EST}</i>
  `);

  return (`
    <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
    Population: <i>${d.POP_EST}</i>
    
    <div className="tooltip>
      <div className="tooltip-key">
      <span className="tooltip-value"> Num of Cases: ${' ' + hoveredCountry.cases} </span>
      </div>
      <div className="tooltip-key">
      New Cases: <span className="tooltip-value"> ${' ' + hoveredCountry.todayCases} </span>
      </div>
    </div>
  `)
}

const giveColor = (d, data) => {
  const currentCountry = data.filter((i) => i.country.toLowerCase() === d.properties.ADMIN.toLowerCase() || i.country.toLowerCase() === d.properties.BRK_A3.toLowerCase())[0];
  console.log(currentCountry);

  if (!currentCountry) return '#fff';
  
  if (currentCountry.cases <= 20) {
    return '#52B2F5';
  } if (currentCountry.cases <= 50) {
    return '#7AF85B';
  } if (currentCountry.cases <= 1000) {
    return '#E1953E';
  }
  return '#E50538';
}

// country: "Iran"
// cases: 20610
// todayCases: 966
// deaths: 1556
// todayDeaths: 123
// recovered: 7635
// active: 11419
// critical: 0
// casesPerOneMillion: 245

export default ({
  data
}) => {
  const globeEl = React.useRef();

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    // globeEl.current.controls().autoRotate = true;
    // globeEl.current.controls().autoRotateSpeed = 0.1;
    globeEl.current.pointOfView({ lat: 24, lng: 78, altitude: 2.4 });

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
      polygonCapColor={d => giveColor(d, data)}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonStrokeColor={() => '#111'}
      polygonLabel={({ properties: d }) => tooltipInfo(d, data)}
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
    />
  );
};