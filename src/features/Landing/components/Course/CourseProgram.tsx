import { Card, Flex, Grid, Text, Title } from "@mantine/core";
import styles from "./Course.module.css";

export const CourseProgram = ({ course }: any) => {
  return (
    <Flex direction="column">
      <Title my={20}>Программа курса</Title>
      <Card
        className={styles.courseProgramCard}
        mt={10}
        shadow="sm"
        radius="xl"
        withBorder
        sx={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <Flex direction="column">
          {course?.course_blocks?.sort((a:any,b:any) => a.number - b.number)?.map((item: any, key: any) => (
            <Grid key={key}>
              <Grid.Col span={3}>
                <span style={{ color: "#2DBE61" }}>Блок {item.number}</span>{" "}
              </Grid.Col>
              <Grid.Col span={9}>
                <Flex direction="column">
                  <Text fw={500}>{item.title}</Text>
                  <Text
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  />
                </Flex>
              </Grid.Col>
            </Grid>
          ))}
        </Flex>
      </Card>
    </Flex>
  );
};
