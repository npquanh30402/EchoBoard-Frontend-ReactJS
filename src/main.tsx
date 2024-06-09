import ReactDOM from "react-dom/client";
import "./assets/fonts/IosevkaAile.css";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routes/Router.tsx";
import { ToastContainer } from "react-toastify";
import "@mdxeditor/editor/style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={Router} />
    <ToastContainer pauseOnHover={true} position={"bottom-right"} />
  </>,
);
