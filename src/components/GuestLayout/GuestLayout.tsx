import { Outlet, useNavigate } from "react-router-dom";
import { GuestHeader } from "./components/GuestHeader";
import { Footer } from "../Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";

export function GuestLayout() {
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/app");
    }
  }, [isAuth]);

  return (
    <div className="wrapper">
      <GuestHeader />
      <div className="main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
