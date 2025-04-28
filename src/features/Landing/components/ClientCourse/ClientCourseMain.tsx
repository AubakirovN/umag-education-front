import { Badge, Card, Flex, Grid, Text, Title } from "@mantine/core";
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
              <a className={styles.courseButton}>Начать курс</a>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={5} className={styles.courseImage}>
          <Badge color="orange" variant="outline" fz={12}>
            {course?.roles?.[0]?.role_name}
          </Badge>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
