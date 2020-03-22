import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';

import Navbar from './components/Navbar';
import Globe from './components/Globe';

const App = () => {

  const [worldCoronaData, updateData] = useState([]);
  const [isLoading, loadingStatus] = useState(true);

  useEffect(() => {
    fetch('https://corona.lmao.ninja/countries')
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        updateData(data);
        loadingStatus(false);
      })

      window.onresize = () => {
        if (window.RT) clearTimeout(window.RT);
        window.RT = setTimeout(() => window.location.reload(false), 100);
      };
  
  }, [true])

  if (isLoading) return <p className="loader"></p>;

  return (
    <div className="App">
      <Navbar />
      <section>
        <Globe data={worldCoronaData} />
      </section>
    </div>
  );
}

export default App;
