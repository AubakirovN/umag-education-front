import { completeSublesson, getCourse } from "@/core/api";
import { Accordion, Box, Flex, ScrollArea, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ClientLessonPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetCourse, setCurrentSublesson } from "@/slice/courseSlice";
import { RootState } from "@/store";
import ReactPlayer from "react-player";
import { TestModal } from "./TestModal";

export const ClientLessonPage = () => {
  const { id, blockId } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { currentSublesson } = useSelector((state: RootState) => state.course);
  const [blocks, setBlocks] = useState<any>([]);
  const [testModal, setTestModal] = useState(false);
  const [openedLessons, setOpenedLessons] = useState<string[]>([]);

  const openTestModal = () => {
    setTestModal(true);
  };

  const closeTestModal = () => {
    setTestModal(false);
  };

  const getAllSublessons = () => {
    const currentBlock = blocks?.find(
      (block: any) => Number(block?.id) === Number(blockId)
    );

    if (!currentBlock) return [];

    return currentBlock?.lessons?.flatMap(
      (lesson: any) => lesson?.sublessons || []
    );
  };

  const goToPrev = () => {
    const allSublessons = getAllSublessons();

    const currentIndex = allSublessons.findIndex(
      (sub: any) => sub.id === currentSublesson?.id
    );

    if (currentIndex > 0) {
      const prevSublesson = allSublessons[currentIndex - 1];
      dispatch(setCurrentSublesson(prevSublesson));
    }
  };

  const goToNext = async () => {
    const allSublessons = getAllSublessons();

    const currentIndex = allSublessons.findIndex(
      (sub: any) => sub.id === currentSublesson?.id
    );

    if (currentIndex === -1) return;

    await completeSublesson(currentSublesson?.id);

    const nextSublesson = allSublessons[currentIndex + 1];

    if (nextSublesson) {
      dispatch(setCurrentSublesson(nextSublesson));
    } else {
      openTestModal();
    }
  };

  const checkSublessons = () => {
    const allSublessons = getAllSublessons();

    const currentIndex = allSublessons.findIndex(
      (sub: any) => sub.id === currentSublesson?.id
    );

    if (currentIndex === -1) return;
    const nextSublesson = allSublessons[currentIndex + 1];
    if (nextSublesson) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    getData();

    return () => {
      dispatch(resetCourse());
    };
  }, []);

  useEffect(() => {
    if (currentSublesson?.lesson_id) {
      const lessonIdStr = String(currentSublesson.lesson_id);
      setOpenedLessons((prev) =>
        prev.includes(lessonIdStr) ? prev : [...prev, lessonIdStr]
      );
    }
  }, [currentSublesson]);

  const getData = async () => {
    const response = await getCourse(id as string);
    const courseBlocks = response?.data?.course_blocks;
    setBlocks(courseBlocks);
  };

  return (
    <Flex w="100%" style={{ minHeight: "calc(100vh - 181px)" }}>
      <Box w={300} p="md" bg="#f5f5f5" pos="sticky">
        <ScrollArea>
          <Flex gap={10}>
            <img
              src="/img/started.svg"
              style={{ width: 20, height: 20 }}
              alt="icon"
            />
            <Flex direction="column" gap={2}>
              <Text fz={14} fw={400}>
                Блок:
              </Text>
              <Text fz={20} fw={500} color="#5c5c5c">
                {
                  blocks?.find(
                    (item: any) => Number(item?.id) === Number(blockId)
                  )?.title
                }
              </Text>
            </Flex>
          </Flex>
          <Accordion
            variant="separated"
            multiple
            // defaultValue={[String(currentSublesson?.lesson_id)] || []}
            value={openedLessons}
            onChange={setOpenedLessons}
          >
            {blocks
              ?.find((el: any) => Number(el?.id) === Number(blockId))
              ?.lessons.map((lesson: any) => (
                <Accordion.Item
                  key={lesson?.id}
                  value={String(lesson?.id)}
                  bg="#f5f5f5 !important"
                  style={{ border: "none" }}
                >
                  <Accordion.Control>
                    <Flex gap={8} align="center">
                      <img
                        src="/img/started.svg"
                        style={{ width: 20, height: 20 }}
                        alt="icon"
                      />
                      <Text fz={16} fw={500}>
                        {lesson?.title}
                      </Text>
                    </Flex>
                  </Accordion.Control>
                  <Accordion.Panel>
                    {lesson?.sublessons?.map((sub: any) => (
                      <div
                        key={sub.id}
                        className={styles.subTitle}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: 10,
                          backgroundColor:
                            sub?.id === currentSublesson?.id ? "#E8F1FE" : "",
                          borderLeft:
                            sub?.id === currentSublesson?.id
                              ? "3px solid #7481F4"
                              : "",
                        }}
                        onClick={() => dispatch(setCurrentSublesson(sub))}
                      >
                        <img
                          src={
                            sub?.user_ids?.some(
                              (el: any) =>
                                Number(el) === Number(currentUser?.id)
                            )
                              ? "/img/started.svg"
                              : "/img/not-started.svg"
                          }
                          style={{ width: 20, height: 20 }}
                          alt="icon"
                        />
                        <Text>{sub.title}</Text>
                      </div>
                    ))}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            {/* <Accordion.Item
              key={randomId()}
              value="test"
              bg="#f5f5f5 !important"
              style={{ border: "none" }}
            >
              <Accordion.Control>
                <Flex gap={8} align="center">
                  <img
                    src="/img/started.svg"
                    style={{ width: 20, height: 20 }}
                    alt="icon"
                  />
                  <Text fz={16} fw={500}>
                    Тест
                  </Text>
                </Flex>
              </Accordion.Control>
              <Accordion.Panel>
                <div
                  key={randomId()}
                  className={styles.subTitle}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: 10,
                    backgroundColor:
                      currentSublesson?.id === "test" ? "#E8F1FE" : "",
                    borderLeft:
                      currentSublesson?.id === "test"
                        ? "3px solid #7481F4"
                        : "",
                  }}
                  onClick={() => openTestModal()}
                >
                  <img
                    src="/img/not-started.svg"
                    style={{ width: 20, height: 20 }}
                    alt="icon"
                  />
                  <Text>Тест</Text>
                </div>
              </Accordion.Panel>
            </Accordion.Item> */}
          </Accordion>
        </ScrollArea>
      </Box>
      <Box style={{ flex: 1 }} px="md" pb={32}>
        <Flex
          direction="column"
          p={24}
          mb={28}
          style={{ borderRadius: 24 }}
          bg="#f5f5f5"
        >
          <Text fz={20} fw={500} mb={20}>
            {currentSublesson?.title}
          </Text>
          {currentSublesson?.video_url && (
            <div
              style={{
                position: "relative",
                paddingTop: "56.25%",
              }}
            >
              <ReactPlayer
                url={currentSublesson?.video_url}
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
          {currentSublesson?.description ? (
            <div
              dangerouslySetInnerHTML={{
                __html: currentSublesson?.description,
              }}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: currentSublesson?.description,
              }}
            />
          )}
        </Flex>
        <Flex justify="center" gap={12}>
          {Number(
            blocks?.find((item: any) => Number(item?.id) === Number(blockId))
              ?.lessons?.[0]?.sublessons?.[0]?.id
          ) !== Number(currentSublesson?.id) && (
            <div className={styles.prevButton} onClick={goToPrev}>
              Предыдущая тема
            </div>
          )}
          <div className={styles.nextButton} onClick={goToNext}>
            {checkSublessons()
              ? "Завершить тему и продолжить"
              : "Пройти тестирование"}
          </div>
        </Flex>
      </Box>
      <TestModal
        block={blocks?.find(
          (item: any) => Number(item?.id) === Number(blockId)
        )}
        opened={testModal}
        closeModal={closeTestModal}
      />
    </Flex>
  );
};
