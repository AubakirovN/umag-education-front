import { Badge, Button, Card, Flex, Grid, Text } from "@mantine/core";
import { CourseSearcher } from "../CourseSearcher";
import { useState } from "react";

const courses = [
  {
    title: "Course 1",
    blockCount: 4,
    lessonCount: 10,
    tag: "Партнер",
  },
  {
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 1",
    blockCount: 4,
    lessonCount: 10,
    tag: "Менеджер",
  },
  {
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 4,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 1",
    blockCount: 4,
    lessonCount: 10,
    tag: "Партнер",
  },
  {
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 1",
    blockCount: 4,
    lessonCount: 10,
    tag: "Менеджер",
  },
  {
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 4,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
];

export const Courses = () => {
  const step = 12;
  const [visibleCount, setVisibleCount] = useState(step);
  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + step);
  };
  console.log(visibleCount);
  return (
    <>
      <CourseSearcher />
      <Grid mt={5}>
        {courses?.slice(0, visibleCount)?.map((course, index) => (
          <Grid.Col span={4} key={index}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Grid>
                <Grid.Col span={7}>
                  <Text weight={500}>
                    {course?.title}skldfjl ksdfjkd sfjlskdj
                  </Text>
                </Grid.Col>
                <Grid.Col span={5}>
                  <Badge color="pink" variant="light" fz={9}>
                    {course?.tag}
                  </Badge>
                </Grid.Col>
              </Grid>
              <Text size="sm" color="dimmed">
                {course?.blockCount} блока {course?.lessonCount} уроков
              </Text>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt={50}
                radius="md"
              >
                Начать курс
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      {visibleCount < courses?.length && (
        <Flex justify="center" mt={20}>
          <Button onClick={() => showMore()}>Еще курсы</Button>
        </Flex>
      )}
    </>
  );
};
