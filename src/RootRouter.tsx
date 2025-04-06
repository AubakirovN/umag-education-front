import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

import { LandingPage } from "./features/Landing/pages/LandingPage";
import { GuestLayout } from "./components/GuestLayout";
import { ErrorPage } from "./features/Error/pages";
import { CoursePage } from "./features/Landing/pages/CoursePage/CoursePage.tsx";
import { AppLayout } from "./components/AppLayout/AppLayout.tsx";
import { ClientCoursePage } from "./features/Landing/pages/ClientCoursePage/ClientCoursePage.tsx";

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
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "courses/:id", element: <ClientCoursePage /> },
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
