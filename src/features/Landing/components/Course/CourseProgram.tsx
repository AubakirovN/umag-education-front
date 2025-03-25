import { Card, Flex, List, Text, Title } from "@mantine/core";
import styles from "./Course.module.css";

const coursePrograms = [
  { id: 1, block: 1, title: "Знакомство с программой" },
  { id: 2, block: 2, title: "Оборудование" },
  { id: 3, block: 3, title: "Техническая поддержка" },
  { id: 4, block: 4, title: "Повышение квалификации" },
];

export const CourseProgram = () => {
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
          {coursePrograms?.map((item, key) => (
            <Text key={key} fw={500}>
              <span style={{ color: "#2DBE61" }}>Блок {item.block}</span>{" "}
              {item.title}
            </Text>
          ))}
        </Flex>
      </Card>
    </Flex>
  );
};
