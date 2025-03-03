import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

import { LandingPage } from "./features/Landing/pages/LandingPage";
import { GuestLayout } from "./components/GuestLayout";
import { ErrorPage } from "./features/Error/pages";
import { AuthRouter } from "./features/Auth/AuthRouter.tsx";
import { CoursePage } from "./features/Landing/pages/CoursePage/CoursePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollRestoration />
        <GuestLayout />
      </>
    ),
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/courses/:id", element: <CoursePage /> },
      { path: "login/*", element: <AuthRouter /> },
      // { path: "horses", element: <HorsesPage /> },
      // { path: "horses/:id", element: <HorsePage /> },
    ],
  },
  {
    path: "/:status/error",
    element: <ErrorPage />,
  },
  // {
  //   path: "*",
  //   element: <Navigate to="/404/error" replace />,
  // },
]);

export const RootRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
