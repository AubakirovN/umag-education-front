import { Anchor, Breadcrumbs } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ClientCourse } from "../../components/ClientCourse";

export const ClientCoursePage = () => {
  const { t } = useTranslation();
  const items = [
    { title: t("breadcrumbs.main"), href: "/" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <>
    <Breadcrumbs>{items}</Breadcrumbs>
    <ClientCourse />
    </>
  )
}