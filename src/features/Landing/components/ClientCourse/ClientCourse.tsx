import { ClientCourseMain } from "./ClientCourseMain";
import { ClientCourseProgram } from "./ClientCourseProgram";
import { ClientCourseInfo } from "./ClientCourseInfo";



export const ClientCourse = ({ course }: any) => {

  return (
    <>
      <ClientCourseMain course={course} />
      <ClientCourseInfo course={course} />
      <ClientCourseProgram course={course} />
    </>
  );
};
