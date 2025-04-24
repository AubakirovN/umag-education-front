import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../Footer";
import { Container } from "@mantine/core";
import { AppHeader } from "./components/AppHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";

export function AppLayout() {
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth]);

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
