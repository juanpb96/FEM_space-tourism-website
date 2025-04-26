import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SpaceTourismWebsite } from "../SpaceTourismWebsite";
// TODO: Use barrel exports for page components - Issue #50
import { Home } from "../pages/Home/Home";
import { Destination } from "../pages/Destination/Destination";
import { Crew } from "../pages/Crew/Crew";
import { Technology } from "../pages/Technology/Technology";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage";

const routes = [
  {
    path: "/",
    element: <SpaceTourismWebsite />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "destination",
        element: <Destination />,
      },
      {
        path: "crew",
        element: <Crew />,
      },
      {
        path: "technology",
        element: <Technology />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: "/FEM_space-tourism-website/",
});

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
