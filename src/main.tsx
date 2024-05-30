import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/fonts/IosevkaAile.css";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routes/Router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>,
);
