import { Anchor, Breadcrumbs } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Course } from "../../components/Course";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourse } from "@/core/api";
import { IconChevronRight } from "@tabler/icons-react";

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
    <Anchor href={item.href} key={index} style={{color: '#000'}}>
      {item.title}
    </Anchor>
  ));
  return (
    <div>
      <Breadcrumbs separator={<IconChevronRight />}>{items}</Breadcrumbs>
      <Course course={course} />
    </div>
  );
};
