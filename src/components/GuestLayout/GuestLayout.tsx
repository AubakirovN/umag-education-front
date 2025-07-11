import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { GuestHeader } from "./components/GuestHeader";
import { Footer } from "../Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";
import { Container } from "@mantine/core";

export function GuestLayout() {
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(`/app${location?.pathname}`);
    }
  }, [isAuth]);

  return (
    <div
      className="wrapper"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div style={{ flex: 1 }}>
        <GuestHeader />
        <Container size={1234} p={20}>
          <Outlet />
        </Container>
      </div>
      <Footer />
    </div>
  );
}
