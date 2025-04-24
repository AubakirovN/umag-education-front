import { Badge, Card, Flex, Grid, Text, Title } from "@mantine/core";
import styles from "./Course.module.css";

export const CourseMain = ({ course }: any) => {
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
              <Text fz={14} my={20}>
                <b>Описание:</b> {course?.description}
              </Text>
              <Text fz={14}>
                <b>Тест:</b> Mock Данный курс содержит 2 теста
              </Text>
              <Text fz={14}>
                <b>Продолжительность обучения:</b> {course?.deadline ? course?.deadline: "-"}
              </Text>
              <Text fz={14}>
                <b>Сертификат:</b> После окончания курса выдается индивидуальный сертификат
              </Text>
            </Flex>
            <Flex>
              <a className={styles.courseButton}>Начать курс</a>
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
