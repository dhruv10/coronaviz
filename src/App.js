import React from 'react';
import 'bulma/css/bulma.css';
import './App.css';

import Navbar from './components/Navbar';
import Globe from './components/Globe';

function App() {
  return (
    <div className="App">
      <Navbar />
      <section>
        <Globe />
      </section>
    </div>
  );
}

export default App;
