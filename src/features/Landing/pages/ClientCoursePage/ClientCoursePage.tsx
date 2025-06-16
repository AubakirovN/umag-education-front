import { Anchor, Breadcrumbs, Container } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { ClientCourse } from "../../components/ClientCourse";
import { IconChevronRight } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourse } from "@/core/api";

export const ClientCoursePage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);

  const getData = async () => {
    const response = await getCourse(id as string);
    setCourse(response?.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const items = [
    { title: t("breadcrumbs.main"), href: "/" },
    { title: course?.title, href: "/" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} style={{ color: "#000" }}>
      {item.title}
    </Anchor>
  ));
  return (
    <Container size={1234} p={20}>
      <Breadcrumbs separator={<IconChevronRight />}>{items}</Breadcrumbs>
      <ClientCourse course={course} />
    </Container>
  );
};
