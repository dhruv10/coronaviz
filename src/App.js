import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.css';

import Navbar from './components/Navbar';
import Globe from './components/Globe';

const App = () => {

  const [ worldCoronaData, updateData ] = useState([]);

  useEffect(() => {
    fetch('https://corona.lmao.ninja/countries')
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        updateData(data);
      })
  }, [ true ])

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
