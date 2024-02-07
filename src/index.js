import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { init, events, app, window } from "@neutralinojs/lib"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

window.move(0,0)

init();
events.on("windowClose", () => {
  app.killProcess();
});