"use strict";
exports.__esModule = true;
var react_1 = require("react");
var client_1 = require("react-dom/client");
// import App from './App.jsx'
var App_jsx_1 = require("../src/components/App.jsx");
require("./index.css");
client_1["default"].createRoot(document.getElementById('root')).render(<react_1["default"].StrictMode>
    <App_jsx_1["default"] />
  </react_1["default"].StrictMode>);
