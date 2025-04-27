import { getCourse } from "@/core/api/courseApi";
import { CourseMain } from "./CourseMain";
import { CourseProgram } from "./CourseProgram";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Course = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const getData = async () => {
    const response = await getCourse(id as string);
    setCourse(response?.data);
  };

  useEffect(() => {
    getData();
  }, []);

console.log(course);

  return (
    <>
      <CourseMain course={course} />
      <CourseProgram course={course}/>
    </>
  );
};
