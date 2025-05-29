import { Card, Flex, Grid, Text, Title } from "@mantine/core";
import styles from "./ClientCourse.module.css";

export const ClientCourseMain = ({ course }: any) => {
  return (
    <Card
      className={styles.courseMainCard}
      mt={10}
      shadow="sm"
      radius="lg"
      withBorder
      sx={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <Grid h="100%">
        <Grid.Col span={7}>
          <Flex direction="column" justify="space-between" h="100%">
            <Flex direction="column">
              <Title>{course?.title}</Title>
              <Text
                fz={14}
                my={20}
                dangerouslySetInnerHTML={{ __html: course?.description }}
              />
            </Flex>
            <Flex>
              <span
                className={styles.courseButton}
                onClick={() => console.log("navigate to lesson page")}
              >
                Начать курс
              </span>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={5}>
          <div className={styles.courseImage} />
        </Grid.Col>
      </Grid>
    </Card>
  );
};
