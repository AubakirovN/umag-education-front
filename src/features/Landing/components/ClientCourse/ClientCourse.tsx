import { ClientCourseMain } from "./ClientCourseMain";
import { ClientCourseProgram } from "./ClientCourseProgram";
import { ClientCourseInfo } from "./ClientCourseInfo";
import { useEffect, useState } from "react";
import { checkIsAvailableCourse } from "@/core/api";
import { useParams } from "react-router-dom";



export const ClientCourse = ({ course }: any) => {
  const {id} = useParams();
  const [isAvailable, setIsAvailable] = useState(false);

  const isCourseAvailable = async () => {
    try {
      await checkIsAvailableCourse(id as string);
      setIsAvailable(true)
    } catch (e) {
      setIsAvailable(false);
    }
  }
  useEffect(() => {
    isCourseAvailable()
  }, [])

  return (
    <>
      <ClientCourseMain course={course} isAvailable={isAvailable} setIsAvailable={setIsAvailable} />
      <ClientCourseInfo course={course} />
      <ClientCourseProgram course={course} isAvailable={isAvailable} />
    </>
  );
};
