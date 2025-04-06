import { Navigate, Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Container } from "@mantine/core";
import { AppHeader } from "./components/AppHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function AppLayout() {
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

  if (!isAuth) {
    return <Navigate to="/404/error" replace />;
  }

  return (
    <>
      <AppHeader />
      <Container size="xl">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
