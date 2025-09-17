import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header.jsx";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]/index.jsx";
import MyTrips from "./my-trips/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "create-trip",
    element: <CreateTrip />,
  },
  {
    path: "view-trip/:tripId",
    element: <ViewTrip />,
  },
  {
    path: "/my-trips",
    element: <MyTrips />,
  },
]);

createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId="952727520694-gs2lnabl3c20jmg449l7bengrdvefc38.apps.googleusercontent.com">
      <Header />
      <ToastContainer />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
);
