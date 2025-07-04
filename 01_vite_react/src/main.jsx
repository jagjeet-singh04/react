import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React from 'react'; // Fixed import - removed curly braces
import App from './App.jsx';

// const reactElement = React.createElement(
//   'a',
//   {href: "https://google.com", target: "_blank"},
//   'click me to visit google'
// );

createRoot(document.getElementById('root')).render(
   <App />
);