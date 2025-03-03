import { Outlet } from "react-router-dom";
import { Container } from "@mantine/core";
import { GuestFooter } from "./components/GuestFooter";
import { GuestHeader } from "./components/GuestHeader";

export function GuestLayout() {
  return (
    <>
      <GuestHeader />
      <Container size="xl">
        <Outlet />
      </Container>
      <GuestFooter />
    </>
  );
}
