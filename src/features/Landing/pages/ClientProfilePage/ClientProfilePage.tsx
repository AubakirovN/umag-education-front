import { Anchor, Breadcrumbs, Container } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { ClientProfile } from "../../components/ClientProfile/ClientProfile";

export const ClientProfilePage = () => {
  const items = [
    { title: "Профиль", href: "/app" },
    { title: "Редактирование", href: "/app/profile" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} style={{ color: "#000" }}>
      {item.title}
    </Anchor>
  ));
  return (
    <Container size={1234} p={0}>
      <Breadcrumbs separator={<IconChevronRight />}>{items}</Breadcrumbs>
      <ClientProfile />
    </Container>
  );
};
