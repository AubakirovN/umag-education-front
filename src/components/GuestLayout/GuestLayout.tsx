import { Navigate, Outlet } from "react-router-dom";
import { Container } from "@mantine/core";
import { GuestHeader } from "./components/GuestHeader";
import { Footer } from "../Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function GuestLayout() {
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

  if (isAuth) {
    return <Navigate to="/404/error" />
  }

  return (
    <>
      <GuestHeader />
      <Container size="xl">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
