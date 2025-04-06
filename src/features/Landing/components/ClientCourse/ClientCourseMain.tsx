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
            <Flex direction="column" justify="center">
              <Title>{course?.title}</Title>
              <Text fz={14} my={20}>
                <img src="/img/burger-icon.png" /> {course?.description}
              </Text>
              <Text fz={14}>
                <img src="/img/warning-icon.png" /> {course?.test}
              </Text>
              <Text fz={14}>
                <b>Продолжительность обучения:</b> {course?.duration}
              </Text>
              <Text fz={14}>
                <b>Сертификат:</b> {course?.cert}
              </Text>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={5} className={styles.courseImage}>
          <Badge color="orange" variant="outline" fz={12}>
            {course?.tag}
          </Badge>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
