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
        handle: { title: "Home" },
        element: <Home />,
      },
      {
        path: "destination",
        handle: { title: "Destination" },
        element: <Destination />,
      },
      {
        path: "crew",
        handle: { title: "Crew" },
        element: <Crew />,
      },
      {
        path: "technology",
        handle: { title: "Technology" },
        element: <Technology />,
      },
      {
        path: "*",
        handle: { title: "Page not found" },
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
