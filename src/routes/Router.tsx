import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import { Homepage } from "../pages/Home/Homepage.tsx";

export const Router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
    ],
  },
]);
