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
import { ConfirmPage } from "./features/Auth/pages/ConfirmPage/ConfirmPage.tsx";
import { ResetPage } from "./features/Auth/pages/ResetPage/ResetPage.tsx";
import { ClientProfilePage } from "./features/Landing/pages/ClientProfilePage/ClientProfilePage.tsx";
import { ClientLessonPage } from "./features/Landing/pages/ClientLessonPage/ClientLessonPage.tsx";
import { ClientTestPage } from "./features/Landing/pages/ClientTestPage/ClientTestPage.tsx";
import { CertificatePage } from "./features/Landing/pages/CertificatePage/CertificatePage.tsx";

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
      { path: "/confirm-email/:id", element: <ConfirmPage /> },
      { path: "/reset-password/:id", element: <ResetPage /> },
      { path: "verify-qr/:qrLink", element: <CertificatePage /> },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "courses/:id", element: <ClientCoursePage /> },
      { path: "courses/:id/block/:blockId", element: <ClientLessonPage /> },
      { path: "courses/:id/block/:blockId/test", element: <ClientTestPage /> },
      { path: "profile/:id?", element: <ClientProfilePage /> },
    ],
  },
  {
    path: "/:status/error",
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <Navigate to="/404/error" replace />,
  },
]);

export const RootRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
