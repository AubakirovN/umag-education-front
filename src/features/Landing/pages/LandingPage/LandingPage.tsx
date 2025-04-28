import { useState } from "react";
import { CourseRoles } from "../../components/CourseTags";
import { Courses } from "../../components/Courses";

export function LandingPage() {
  const [chosenRole, setChosenRole] = useState<any>("");

  return (
    <>
      <CourseRoles chosenRole={chosenRole} setChosenRole={setChosenRole} />
      <Courses chosenRole={chosenRole} />
    </>
  );
}
