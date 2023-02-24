import './App.css';
import React, { useState } from 'react';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
        <Main/>
    </BrowserRouter>
  );
}

export default App;
