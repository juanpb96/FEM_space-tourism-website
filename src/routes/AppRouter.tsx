import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { SpaceTourismWebsite } from '../SpaceTourismWebsite';
import { Destination } from '../pages/Destination';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SpaceTourismWebsite />,
    children: [
      {
        path: 'destination',
        element: <Destination />
      }
    ]
  }
]);

export const AppRouter = () => {
  return (
    <RouterProvider router={router} />
  );
};
