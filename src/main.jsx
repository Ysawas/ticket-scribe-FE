
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Make sure to wrap the entire app in StrictMode
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
