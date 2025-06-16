import {
  completeSublesson,
  getCourse,
  getSublessonsByLessonId,
} from "@/core/api";
import { Accordion, Box, Flex, Progress, ScrollArea, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ClientLessonPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetCourse, setCurrentSublesson } from "@/slice/courseSlice";
import { RootState } from "@/store";
import ReactPlayer from "react-player";

type Sublesson = {
  id: number;
  lesson_id: number;
  title: string;
  description: string;
  video_url: string | null;
  lesson: {
    id: number;
    title: string;
  };
};

type GroupedResult = {
  id: number;
  title: string;
  sublessons: Sublesson[];
};

export const ClientLessonPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentSublesson } = useSelector((state: RootState) => state.course);
  const [blocks, setBlocks] = useState<any>([]);
  const [lessons, setLessons] = useState<any>([]);
  const [sublessons, setSublessons] = useState<any>([]);

  const groupSublessonsByLesson = (
    allSublessons: Sublesson[]
  ): GroupedResult[] => {
    const map = new Map<number, GroupedResult>();

    for (const sub of allSublessons) {
      const lessonId = sub.lesson.id;

      if (!map.has(lessonId)) {
        map.set(lessonId, {
          id: sub.lesson.id,
          title: sub.lesson.title,
          sublessons: [],
        });
      }

      map.get(lessonId)?.sublessons.push(sub);
    }

    return Array.from(map.values());
  };

  const getData = async () => {
    const response = await getCourse(id as string);
    const course = response?.data;
    setBlocks(course?.course_blocks);
    const allLessonIds = course?.course_blocks?.flatMap((block: any) =>
      block.lessons.map((lesson: any) => lesson.id)
    );
    const sublessonResponses = await Promise.all(
      allLessonIds?.map((id: any) => getSublessonsByLessonId(id))
    );

    const allSublessons = sublessonResponses.flatMap((res) => res.data);
    const grouped = groupSublessonsByLesson(allSublessons);
    setSublessons(allSublessons);
    setLessons(grouped);
    console.log(lessons);
    dispatch(setCurrentSublesson(allSublessons?.[0]));
  };
  useEffect(() => {
    getData();
    return () => {
      dispatch(resetCourse());
    };
  }, []);

  const goToPrev = () => {
    const currentIndex = sublessons.findIndex(
      (s: any) => s.id === currentSublesson?.id
    );
    if (currentIndex > 0) {
      dispatch(setCurrentSublesson(sublessons[currentIndex - 1]));
    }
  };

  const goToNext = async () => {
    const currentIndex = sublessons.findIndex(
      (s: any) => s.id === currentSublesson?.id
    );
    if (currentIndex < sublessons.length - 1) {
      await completeSublesson(currentSublesson?.id);
      dispatch(setCurrentSublesson(sublessons[currentIndex + 1]));
    }
  };
  console.log(blocks);
  console.log(currentSublesson);

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
                  blocks?.find((item: any) =>
                    item.lessons?.find(
                      (el: any) => el?.id === currentSublesson?.lesson_id
                    )
                  )?.title
                }
              </Text>
            </Flex>
          </Flex>
          <Progress mt={20} styles={{bar: {background: '#91D0FF'}}} value={75} label="75%" size="xl" radius="xl" />

          <Accordion variant="separated" multiple>
            {lessons.map((lesson: any) => (
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
                        src="/img/not-started.svg"
                        style={{ width: 20, height: 20 }}
                        alt="icon"
                      />
                      <Text>{sub.title}</Text>
                    </div>
                  ))}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
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
          {currentSublesson?.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: currentSublesson?.description,
              }}
            />
          )}
        </Flex>
        <Flex justify="center" gap={12}>
          {lessons?.[0]?.sublessons?.[0]?.id !== currentSublesson?.id && (
            <div className={styles.prevButton} onClick={goToPrev}>
              Предыдущая тема
            </div>
          )}
          <div className={styles.nextButton} onClick={goToNext}>
            Завершить тему и продолжить
          </div>
        </Flex>
      </Box>
    </Flex>
  );
};
