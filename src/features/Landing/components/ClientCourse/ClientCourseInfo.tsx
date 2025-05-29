import { Card, Flex, Grid, Text } from "@mantine/core";
import styles from "./ClientCourse.module.css";

export const ClientCourseInfo = ({ course }: any) => {
  return (
    <Grid mt={20}>
      <Grid.Col span={4}>
        <Card
          className={styles.courseInfoCard}
          shadow="sm"
          radius="lg"
          withBorder
          sx={{
            backgroundColor: "#f5f5f5",
          }}
        >
          <Flex direction="column">
            <Text fz={32} fw={500}>
              {course?.count_course_blocks} блоков
            </Text>
            <Text fz={16} fw={400} c="#615c69">
              Курс состоит из {course?.count_course_blocks} блоков, которые
              надо пройти для успешного завершения курса.
            </Text>
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <Card
          className={styles.courseInfoCard}
          shadow="sm"
          radius="lg"
          withBorder
          sx={{
            backgroundColor: "#f5f5f5",
          }}
        >
          <Flex direction="column">
            <Text fz={32} fw={500}>
              1 месяц
            </Text>
            <Text fz={16} fw={400} c="#615c69">
            Длительность курса включая все лекции и тестирования
            </Text>
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <Card
          className={styles.courseInfoCard}
          shadow="sm"
          radius="lg"
          withBorder
          sx={{
            backgroundColor: "#f5f5f5",
          }}
        >
          <Flex direction="column">
            <Text fz={32} fw={500}>
              Сертификат
            </Text>
            <Text fz={16} fw={400} c="#615c69">
            После окончания курса выдаётся индивидуальный сертификат
            </Text>
          </Flex>
        </Card>
      </Grid.Col>
      <Grid.Col span={12} mt={20}>
        <Card
          className={styles.courseDescriptionCard}
          shadow="sm"
          radius="lg"
          withBorder
          sx={{
            backgroundColor: "#f5f5f5",
          }}
        >
          <Flex direction="column">
            <Text fz={32} fw={500}>
              В рамках обучения вы освоите:
            </Text>
            <Text fz={16} fw={400} c="#615c69">
            • принципы работы с программой UMAG;<br/>• основные функции и инструменты
              Admin панели;<br/>• методы оказания технической поддержки пользователям;<br/>
              • процедуры установки и настройки оборудования;<br/>• стандарты выездного
              обслуживания и обучения пользователей.
            </Text>
          </Flex>
        </Card>
      </Grid.Col>
    </Grid>
  );
};
