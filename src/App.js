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

    // window.onresize = () => {
    //   if (window.RT) clearTimeout(window.RT);
    //   window.RT = setTimeout(() => window.location.reload(false), 100);
    // };

  }, [])

  if (isLoading) return <p className="loader"></p>;

  return (
    <div className="App">
      <Sidebar />
      <section>
        <Globe data={worldCoronaData} />
      </section>
    </div>
  );
}

export default App;
