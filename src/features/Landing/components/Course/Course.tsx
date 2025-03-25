import { CourseMain } from "./CourseMain";
import { CourseProgram } from "./CourseProgram";

const course = {
  title: "Курс  для технических специалистов ",
  blockCount: 4,
  lessonCount: 10,
  tag: "Партнер",
  description:
    '"Курс для технических специалистов" предоставляет углубленные знания и навыки в области технологий, подходящих для профессионалов, работающих в IT-сфере. В ходе обучения студенты освоят передовые инструменты и методы работы с современными технологиями',
  test: "Для успешного завершения курса необходимо пройти все тестирования",
  duration: "1 месяц",
  cert: "После окончания курса выдается индивидуальный сертификат",
};

export const Course = () => {
  return (
    <>
      <CourseMain course={course} />
      <CourseProgram />
    </>
  );
};
