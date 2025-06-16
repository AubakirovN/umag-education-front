import { useState } from "react";
import { CourseRoles } from "../../components/CourseTags";
import { Courses } from "../../components/Courses";
import { Container } from "@mantine/core";

export function LandingPage() {
  const [chosenRole, setChosenRole] = useState<any>("");

  return (
    <Container size={1234} p={20}>
      <div className="main">
        <CourseRoles chosenRole={chosenRole} setChosenRole={setChosenRole} />
        <Courses chosenRole={chosenRole} />
      </div>
    </Container>
  );
}
