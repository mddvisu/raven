import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './components/App';
import App from './App';
import { init, events, app } from "@neutralinojs/lib"
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router basename=''>
      <App/>
    </Router>
  </React.StrictMode>
);

window.move(0,0)
init();
events.on("windowClose", () => {
  app.killProcess();
});