import { Anchor, Breadcrumbs } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Course } from "../../components/Course";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourse } from "@/core/api";

export const CoursePage = () => {
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
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Course course={course} />
    </>
  );
};
