import React from "react";

import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import ErrorPage from "./ErrorPage";
import GradiantPage from "./utiltyComponents/GradientDisplay";
import ColorPage from "./utiltyComponents/ColorsDisplay";
import ImageColorExtractor from "./utiltyComponents/ImageColorExtractor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <GradiantPage />,
      },
      {
        path: "gradientdisplay",
        element: <GradiantPage />,
      },
      {
        path: "colorsdisplay",
        element: <ColorPage />,
      },
      {
        path: "imagecolorextractor",
        element: <ImageColorExtractor />,
      },
    ],
  },
]);
