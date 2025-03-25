import { Badge, Button, Card, Flex, Grid, Group, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Курс  для технических специалистов ",
    blockCount: 4,
    lessonCount: 10,
    tag: "Партнер",
  },
  {
    id: 2,
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 3,
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 4,
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 5,
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 6,
    title: "Course 1",
    blockCount: 4,
    lessonCount: 10,
    tag: "Менеджер",
  },
  {
    id: 7,
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 8,
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 9,
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 10,
    title: "Course 2",
    blockCount: 4,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 11,
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 12,
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 13,
    title: "Course 1",
    blockCount: 4,
    lessonCount: 10,
    tag: "Партнер",
  },
  {
    id: 14,
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 15,
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 16,
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 17,
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 18,
    title: "Course 1",
    blockCount: 4,
    lessonCount: 10,
    tag: "Менеджер",
  },
  {
    id: 19,
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 20,
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 21,
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 22,
    title: "Course 2",
    blockCount: 4,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 23,
    title: "Course 2",
    blockCount: 3,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
  {
    id: 24,
    title: "Course 2",
    blockCount: 2,
    lessonCount: 11,
    tag: "Тех специалисты",
  },
];

export const Courses = () => {
  const navigate = useNavigate();
  const step = 12;
  const [visibleCount, setVisibleCount] = useState(step);
  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + step);
  };
  console.log(visibleCount);
  return (
    <>
      {/* <CourseSearcher /> */}
      <Grid mt={5}>
        {courses?.slice(0, visibleCount)?.map((course, index) => (
          <Grid.Col span={4} key={index} h="300px">
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              h="100%"
              pos="relative"
              onClick={() => navigate(`/courses/${course?.id}`)}
              sx={{
                cursor: "pointer",
                backgroundImage: `url('img/customer.png')`,
                backgroundSize: "160px 160px",
                backgroundPosition: "bottom right",
                backgroundRepeat: "no-repeat",
                "&:hover": {
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Flex direction="column" justify="space-between" h="100%">
                <Flex direction="column">
                  <Text weight={500} fz={24} lh="100%">
                    {course?.title}
                  </Text>
                  <Text fz={14} color="dimmed">
                    {course?.blockCount} блока {course?.lessonCount} уроков
                  </Text>
                </Flex>
                <Group>
                  <Badge color="orange" variant="outline" fz={12}>
                    {course?.tag}
                  </Badge>
                </Group>
              </Flex>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
      {visibleCount < courses?.length && (
        <Flex justify="center" mt={20}>
          <Button
            variant="subtle"
            style={{ color: "#000", borderBottom: "#000" }}
            onClick={() => showMore()}
          >
            Еще курсы
          </Button>
        </Flex>
      )}
    </>
  );
};
