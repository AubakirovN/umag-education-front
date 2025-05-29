import { CourseInfo } from "./CourseInfo";
import { CourseMain } from "./CourseMain";
import { CourseProgram } from "./CourseProgram";

export const Course = ({ course }: any) => {
  return (
    <>
      <CourseMain course={course} />
      <CourseInfo course={course} />
      <CourseProgram course={course} />
    </>
  );
};
