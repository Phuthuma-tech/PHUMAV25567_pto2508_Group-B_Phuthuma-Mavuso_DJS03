/**
 * @fileoverview Application entry point.
 * Mounts the React application into the root DOM element.
 * @module main
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/styles.css";

/**
 * Bootstraps the React application by creating a root on the `#root` element
 * and rendering the top-level {@link App} component inside React.StrictMode.
 * StrictMode surfaces potential issues and deprecated patterns during development.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
