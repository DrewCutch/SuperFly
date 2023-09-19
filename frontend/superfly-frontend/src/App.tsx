import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FlightSearchArea } from './components/FlightSearchArea';

function App() {
  return (
    <div id="app">
      <div className="center-children">
        <h1 id="title">SuperFly</h1>
        <FlightSearchArea></FlightSearchArea>
      </div>
      
    </div>
  );
}



export default App;
