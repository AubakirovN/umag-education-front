import { Card, Flex, Grid, Text, Title } from "@mantine/core";
import styles from "./Course.module.css";
import { useDispatch } from "react-redux";
import { openLoginModal } from "@/slice/userSlice";

export const CourseMain = ({ course }: any) => {
  const dispatch = useDispatch();
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
                onClick={() => dispatch(openLoginModal())}
              >
                Начать курс
              </span>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={5} className={styles.courseImage}>
          {/* <Badge color="orange" variant="outline" fz={12}>
            {course?.roles?.[0]?.name}
          </Badge> */}
        </Grid.Col>
      </Grid>
    </Card>
  );
};
