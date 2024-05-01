import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { SpaceTourismWebsite } from '../SpaceTourismWebsite';
import { Home } from '../pages/Home/Home';
import { Destination } from '../pages/Destination/Destination';

const routes = [
  {
    path: '/',
    element: <SpaceTourismWebsite />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'destination',
        element: <Destination />
      },
      {
        // TODO: Create a 404 page to use it here
        path: '*',
        element: <Home />
      },
    ]
  }
];

const router = createBrowserRouter(routes, {
  basename: '/FEM_space-tourism-website/'
});

export const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  );
};
