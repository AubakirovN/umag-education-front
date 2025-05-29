import { useParams } from "react-router-dom";
import { ClientCourseMain } from "./ClientCourseMain";
import { ClientCourseProgram } from "./ClientCourseProgram";
import { useEffect, useState } from "react";
import { getCourse } from "@/core/api";
import { ClientCourseInfo } from "./ClientCourseInfo";



export const ClientCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const getData = async () => {
    const response = await getCourse(id as string);
    setCourse(response?.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <ClientCourseMain course={course} />
      <ClientCourseInfo course={course} />
      <ClientCourseProgram course={course} />
    </>
  );
};
