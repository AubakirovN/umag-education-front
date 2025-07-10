import { Card, Flex, Grid, Progress, Text, Title } from "@mantine/core";
import styles from "./ClientCourse.module.css";
import { checkCourseStatus, getLastSublesson, startCourse } from "@/core/api";
import { useEffect, useState } from "react";
import { intervalToDuration } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate, useParams } from "react-router-dom";
import { CertModal } from "../CertModal/CertModal";
import { ContactModal } from "@/components/AppLayout/components/AppHeader/ContactModal";

export const ClientCourseMain = ({ course, isAvailable }: any) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [cert, setCert] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isArchive, setIsArchive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [lastSublesson, setLastSublesson] = useState<any>("");
  const [isCompleted, setIsCompleted] = useState(false);
  const { id } = useParams();

  const handleStart = async () => {
    await startCourse(course?.id);
    await getRemainingTime();
  };

  const getRemainingTime = async () => {
    try {
      const response = await checkCourseStatus(course?.id as string);
      console.log(response)
      if (response?.data?.status !== "notstarted") {
        setIsStarted(true);
        setRemainingTime(response?.data?.remaining_time);
        if (response?.data?.status === "inprogress") {
          if (remainingTime < 0) {
            setIsArchive(true);
          } else {
            setRemainingTime(response?.data?.remaining_time);
          }
        }
        if (response?.data?.status === "completed") {
          setIsCompleted(true);
        }
      }
    } catch (e) {
      setIsStarted(false);
      console.log(e);
    }
  };

  const formatTimeLeft = (ms: number): string => {
    const duration = intervalToDuration({
      start: 0,
      end: ms,
    });

    return `${duration.days} дней ${duration.hours} часов ${duration.minutes} минут`;
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
                    <span
                      className={styles.courseButton}
                      onClick={() => setContactModal(true)}
                    >
                      Связаться с поддержкой
                    </span>
                  </Flex>
                ) : (
                  ""
                )}
                {isAvailable && !isArchive && isCompleted ? (
                  <Flex mt={12}>
                    <span
                      className={styles.courseButton}
                      onClick={() => setCert(true)}
                    >
                      Посмотреть сертификат
                    </span>
                  </Flex>
                ) : (
                  ""
                )}
                {isAvailable && !isArchive && !isCompleted && (
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
                      <b>{formatTimeLeft(remainingTime)}</b>
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
      <ContactModal
        opened={contactModal}
        onClose={() => setContactModal(false)}
      />
    </Card>
  );
};
