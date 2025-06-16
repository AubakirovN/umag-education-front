import { Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../Footer";
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
        <Outlet />
      <Footer />
    </>
  );
}
