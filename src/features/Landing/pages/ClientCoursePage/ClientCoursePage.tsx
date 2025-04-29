import { Anchor, Breadcrumbs } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ClientCourse } from "../../components/ClientCourse";
import { IconChevronRight } from "@tabler/icons-react";

export const ClientCoursePage = () => {
  const { t } = useTranslation();
  const items = [
    { title: t("breadcrumbs.main"), href: "/" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} style={{color: '#000'}}>
      {item.title}
    </Anchor>
  ));
  return (
    <>
    <Breadcrumbs separator={<IconChevronRight />}>{items}</Breadcrumbs>
    <ClientCourse />
    </>
  )
}