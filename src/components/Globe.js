import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import '../App.css';

import earthNight from '../assets/earth-night.jpg';
import nightSky from '../assets/night-sky.png';
import worldMap from '../datasets/world.geojson';

import numberWithCommas from '../helper';
const d3 = require('d3-scale-chromatic');

const tooltipInfo = (d, data) => {
  const hoveredCountry = data.filter(
    i =>
      i.country.toLowerCase() === d.ADMIN.toLowerCase() ||
      i.country.toLowerCase() === d.BRK_A3.toLowerCase() ||
      i.country ===
        d.ABBREV.split('.')
          .join('')
          .toLowerCase()
  )[0];

  // console.log(i.country, d.ABBREV.split('.').join(""));
  let flagURL;

  if (
    hoveredCountry &&
    hoveredCountry.countryInfo &&
    hoveredCountry.countryInfo.flag
  )
    flagURL = hoveredCountry.countryInfo.flag;

  if (!hoveredCountry)
    return `
    <b>${d.ADMIN} (${d.ISO_A2}):</b> | <img src="${flagURL}" width="16px" />  <br />
    Population: <i>${numberWithCommas(d.POP_EST)}</i>
  `;

  return `
    <b>${d.ADMIN} - ${
    d.ISO_A2
  }</b> | <img src="${flagURL}" width="16px" /> <br />
    <br />
    <span class="tooltip-key">Population:</span> <span class="tooltip-value">${numberWithCommas(parseFloat(
      (d.POP_EST / 1000000).toFixed(2)
    ))} M (${((hoveredCountry.cases / d.POP_EST) * 100).toFixed(
    4
  )}% affected)</span>
    <div>
      <div class="tooltip-key">
      Total number of cases:
      <span class="tooltip-value"> ${' ' + numberWithCommas(hoveredCountry.cases)}
        (${numberWithCommas(hoveredCountry.todayCases) + ' '} today)  </span>
      </div>

      <div class="tooltip-key">
      Total deaths:
      <span class="tooltip-value"> ${' ' + numberWithCommas(hoveredCountry.deaths)}
        (${numberWithCommas(hoveredCountry.todayDeaths) + ' '} today)  </span>
      </div>

      <div class="tooltip-key">
      Active Cases:
      <span class="tooltip-value"> ${' ' + numberWithCommas(hoveredCountry.active)} </span>
      </div>

      <div class="tooltip-key">
      Recovered Cases: 
      <span class="tooltip-value"> ${' ' + numberWithCommas(hoveredCountry.recovered)} </span>
      </div>
    </div>
  `;
};

// cases: 511,
// todayCases: 12,
// deaths: 10,
// todayDeaths: 0,
// recovered: 37,
// active: 464,
// critical: 0,
// casesPerOneMillion: 0

const giveColor = (d, data) => {
  const currentCountry = data.filter(
    i =>
      i.country.toLowerCase() === d.properties.ADMIN.toLowerCase() ||
      i.country.toLowerCase() === d.properties.BRK_A3.toLowerCase() ||
      i.country.toLowerCase() ===
        d.properties.ABBREV.split('.')
          .join('')
          .toLowerCase()
  )[0];
  // console.log(currentCountry);

  if (!currentCountry) return d3.interpolateYlOrRd(0);
  else return d3.interpolateYlOrRd(currentCountry.cases * 0.001);
};

const clicked = (d, data) => {
  const currentCountry = data.filter(
    i =>
      i.country.toLowerCase() === d.properties.ADMIN.toLowerCase() ||
      i.country.toLowerCase() === d.properties.BRK_A3.toLowerCase() ||
      i.country.toLowerCase() ===
        d.properties.ABBREV.split('.')
          .join('')
          .toLowerCase()
  )[0];

  console.log(d, currentCountry);
};

export default ({ data }) => {
  const globeEl = React.useRef();

  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState();

  useEffect(() => {
    globeEl.current.controls().autoRotateSpeed = 0.05;
    globeEl.current.pointOfView({ lat: 24, lng: 78, altitude: 2.4 });

    fetch(worldMap)
      .then(res => res.json())
      .then(setCountries);
  }, []);

  useEffect(() => {
    globeEl.current.controls().autoRotate = hoverD ? false : true;
  }, [hoverD]);

  return (
    <Globe
      ref={globeEl}
      animateIn
      waitForGlobeReady
      globeImageUrl={earthNight}
      backgroundImageUrl={nightSky}
      polygonsData={countries.features}
      polygonAltitude={d => (d === hoverD ? 0.12 : 0.06)}
      polygonCapColor={d => giveColor(d, data)}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonStrokeColor={() => '#111'}
      polygonLabel={({ properties: d }) => tooltipInfo(d, data)}
      onPolygonHover={setHoverD}
      polygonsTransitionDuration={300}
      onPolygonClick={d => clicked(d, data)}
    />
  );
};
