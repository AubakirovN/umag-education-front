import { Accordion, Card, Flex, Progress, Text, Title } from "@mantine/core";
import styles from "./Course.module.css";
import ReactPlayer from "react-player/youtube";

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
        {course?.course_blocks?.length > 0 && (
          <Accordion chevronPosition="right" variant="separated">
            {course?.course_blocks
              ?.sort((a: any, b: any) => a.number - b.number)
              ?.map((item: any) => (
                <Accordion.Item
                  value={item.id.toString()}
                  key={item.id}
                  className={styles.courseProgramItem}
                >
                  <Accordion.Control>
                    <Flex w="100%" justify="space-between" align="center">
                      <Flex w="100%" direction="column">
                        <Flex gap={10} align="center">
                          <span style={{ color: "#2DBE61" }}>
                            Блок {item?.pivot?.block_number}
                            {/* Блок {item.number} */}
                          </span>
                          <Text fw={500}>{item.title}</Text>
                        </Flex>
                      </Flex>
                      <Progress
                        style={{ width: 100 }}
                        value={70}
                        label="70%"
                        size="xl"
                        radius="xl"
                      />
                    </Flex>
                  </Accordion.Control>
                  <Accordion.Panel>
                    {item?.lessons?.map((el: any, index: any) => (
                      <Flex key={index} direction="column">
                        <Text
                          style={{
                            paddingLeft: "5px",
                            borderLeft: "4px solid #2DBE61",
                          }}
                        >
                          Урок {index + 1}. {el?.title}
                        </Text>
                        <Text
                          dangerouslySetInnerHTML={{
                            __html: el?.description,
                          }}
                        />
                        {el?.video_url && (
                          <div
                            style={{
                              position: "relative",
                              paddingTop: "56.25%",
                            }}
                          >
                            <ReactPlayer
                              url={el?.video_url}
                              width="100%"
                              height="100%"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                              }}
                              controls
                            />
                          </div>
                        )}
                        <Flex justify="flex-end" mt={20}>
                          <span className={styles.goToLesson}>
                            Перейти к уроку
                          </span>
                        </Flex>
                      </Flex>
                    ))}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
          </Accordion>
        )}
      </Card>
    </Flex>
  );
};
