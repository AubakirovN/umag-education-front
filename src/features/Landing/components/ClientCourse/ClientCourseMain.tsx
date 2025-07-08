import { Card, Flex, Grid, Progress, Text, Title } from "@mantine/core";
import styles from "./ClientCourse.module.css";
import {
  checkCourseStatus,
  getLastSublesson,
  startCourse,
} from "@/core/api";
import { useEffect, useState } from "react";
import {
  addSeconds,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate, useParams } from "react-router-dom";
import { CertModal } from "../CertModal/CertModal";

export const ClientCourseMain = ({ course, isAvailable }: any) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [cert, setCert] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isArchive, setIsArchive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lastSublesson, setLastSublesson] = useState<any>("");
  const { id } = useParams();

  const handleStart = async () => {
    await startCourse(course?.id);
  };

  const getRemainingTime = async () => {
    const now = new Date().getTime();
    try {
      const response = await checkCourseStatus(course?.id as string);
      if (response?.data?.status !== "notstarted") {
        setIsStarted(true);
        setProgress(response?.data?.deadline_timestamp);
        if (response?.data?.status !== "completed" && now > progress) {
          setIsArchive(true);
        }
        if (response?.data?.status === "completed") {
          setCert(true);
        }
      }
    } catch (e) {
      setIsStarted(false);
      console.log(e);
    }
  };

  const formatTimeLeft = (timestampMs: any) => {
    const now = new Date();
    const future = new Date(timestampMs);

    const days = differenceInDays(future, now);
    const hours = differenceInHours(future, addSeconds(now, days * 86400));
    const minutes = differenceInMinutes(
      future,
      addSeconds(now, days * 86400 + hours * 3600)
    );

    return `${days} дней ${hours} часов ${minutes} минут`;
  };

  const getProgress = () => {
    const sublessons = course?.course_blocks?.flatMap((block: any) =>
      block?.lessons?.flatMap((lesson: any) =>
        lesson?.sublessons?.flatMap((sub: any) => sub)
      )
    )?.length;
    const finishedSublessons = course?.course_blocks?.flatMap((block: any) =>
      block?.lessons?.flatMap((lesson: any) =>
        lesson?.sublessons?.flatMap((sub: any) =>
          sub?.user_ids?.filter(
            (el: any) => Number(el) === Number(currentUser?.id)
          )
        )
      )
    )?.length;
    return (finishedSublessons / sublessons) * 100;
  };
  const getLastSub = async () => {
    const resp = await getLastSublesson(id as string);
    setLastSublesson(resp?.data);
  };

  useEffect(() => {
    if (isAvailable) getLastSub();
    return () => {
      setLastSublesson(null);
    };
  }, [isAvailable]);

  useEffect(() => {
    if (course?.id && isAvailable) getRemainingTime();
  }, [course?.id, isAvailable]);

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
            {!isStarted && isAvailable ? (
              <Flex mt={12}>
                <span className={styles.courseButton} onClick={handleStart}>
                  Начать курс
                </span>
              </Flex>
            ) : (
              <>
                {isAvailable && isArchive ? (
                  <Flex mt={12}>
                    <span className={styles.courseButton} onClick={handleStart}>
                      Связаться с нами
                    </span>
                  </Flex>
                ) : (
                  ""
                )}
                {isAvailable && !isArchive && cert ? (
                  <Flex mt={12}>
                    <span className={styles.courseButton} onClick={handleStart}>
                      Посмотреть сертификат
                    </span>
                  </Flex>
                ) : (
                  ""
                )}
                {isAvailable && !isArchive && (
                  <Flex direction="column" mt={12} gap={12}>
                    <Progress
                      my={20}
                      styles={{ bar: { background: "#91D0FF" } }}
                      value={Math.ceil(getProgress()) || 0}
                      label={`${Math.ceil(getProgress())}%`}
                      size="xl"
                      radius="xl"
                    />
                    <span>
                      Ваш курс будет доступен еще:{" "}
                      <b>{formatTimeLeft(progress)}</b>
                    </span>
                    <Flex gap={24} wrap="wrap" align="center">
                      <span
                        className={styles.courseButton}
                        onClick={() => {
                          const blockId = lastSublesson?.next_course_block_id;
                          if (blockId) {
                            navigate(
                              `/app/courses/${course?.id}/block/${blockId}`
                            );
                          } else {
                            navigate(
                              `/app/courses/${course?.id}/block/${course?.course_blocks?.[0]?.id}`
                            );
                          }
                        }}
                      >
                        Продолжить обучение
                      </span>
                      <span style={{ textDecoration: "underline" }}>
                        {lastSublesson?.latest_sublesson?.title}
                      </span>
                    </Flex>
                  </Flex>
                )}
              </>
            )}
          </Flex>
        </Grid.Col>
        <Grid.Col span={5}>
          <div className={styles.courseImage} />
        </Grid.Col>
      </Grid>
      <CertModal opened={cert} onClose={() => setCert(false)} />
    </Card>
  );
};
