import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';

import Sidebar from './components/Sidebar';
import Globe from './components/Globe';

const App = () => {

  const [worldCoronaData, updateData] = useState([]);
  const [isLoading, loadingStatus] = useState(true);

  useEffect(() => {
    fetch('https://corona.lmao.ninja/countries')
      .then((res) => res.json())
      .then((data) => {
        updateData(data);
        loadingStatus(false);
      })

    window.onresize = () => {
      if (window.RT) clearTimeout(window.RT);
      window.RT = setTimeout(() => window.location.reload(false), 100);
    };

  }, [])

  if (isLoading) return <p className="loader"></p>;

  return (
    <div className="App">
      <Sidebar />
      <section>
        <Globe data={worldCoronaData} />
        <div className="legend-text">
          <span>0</span>
          <span>Legend (active cases)</span>
          <span>{worldCoronaData[0].cases}</span>
        </div>
        <div className="observablehq legend" dir="auto"><span><svg viewBox="0 0 10 1" style={{ display: 'block', shapeRendering: 'crispEdges', width: 'calc(100% + 28px)', height: '33px', cursor: 'pointer' }} preserveAspectRatio="none"><rect x="0" width="1" height="1" fill="#ffffcc"></rect><rect x="1" width="1" height="1" fill="#ffefa5"></rect><rect x="2" width="1" height="1" fill="#fedc7f"></rect><rect x="3" width="1" height="1" fill="#febf5b"></rect><rect x="4" width="1" height="1" fill="#fd9d43"></rect><rect x="5" width="1" height="1" fill="#fc7034"></rect><rect x="6" width="1" height="1" fill="#f23d26"></rect><rect x="7" width="1" height="1" fill="#d91620"></rect><rect x="8" width="1" height="1" fill="#b40325"></rect><rect x="9" width="1" height="1" fill="#800026"></rect></svg></span></div>
      </section>
    </div>
  );
}

export default App;
