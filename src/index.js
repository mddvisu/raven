import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { init, events, app } from "@neutralinojs/lib"
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

init();
events.on("windowClose", () => {
  app.exit();
});