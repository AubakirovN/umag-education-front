import { CustomModal } from "@/components/CustomModal";
import { Flex, Text } from "@mantine/core";
import styles from "./ClientLessonPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTest, startTimer } from "@/slice/courseSlice";
import { checkTestAvailable, getTestByBlock } from "@/core/api";
import { useEffect, useState } from "react";
import {
  addDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  startOfDay,
} from "date-fns";

export const TestModal = ({ block, opened, closeModal }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, blockId } = useParams();
  const [attempts, setAttempts] = useState<any>(0);
  const [maxAttempts, setMaxAttempts] = useState(false);
  const [attemptsPerDay, setAttemptsPerDay] = useState(false);
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    formatted: "00:00:00",
  });

  const getData = async () => {
    try {
      const resp = await checkTestAvailable(id as string, blockId as string);
      setAttempts(resp?.data);
    } catch (e: any) {
      if (
        e?.response?.data?.message ===
        "Превышено максимальное количество попыток."
      ) {
        setMaxAttempts(true);
      } else if (
        e?.response?.data?.message === "Вы уже сдавали тест сегодня."
      ) {
        setAttemptsPerDay(true);
      }
    }
  };

  const startTest = async () => {
    try {
      const response = await getTestByBlock(id as string, blockId as string);
      dispatch(setTest(response));
      dispatch(startTimer(600));
      navigate("test");
    } catch (e: any) {
      if (
        e?.response?.data?.message ===
        "Превышено максимальное количество попыток."
      ) {
        setMaxAttempts(true);
      } else if (
        e?.response?.data?.message === "Вы уже сдавали тест сегодня."
      ) {
        setAttemptsPerDay(true);
      }
    }
  };

  function startCountdownToNextDay(
    callback: (time: {
      hours: number;
      minutes: number;
      seconds: number;
      formatted: string;
    }) => void
  ) {
    function update() {
      const now = new Date();
      const nextMidnight = startOfDay(addDays(now, 1));

      const hours = differenceInHours(nextMidnight, now);
      const minutes = differenceInMinutes(nextMidnight, now) % 60;
      const seconds = differenceInSeconds(nextMidnight, now) % 60;

      const formatted = `${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      callback({ hours, minutes, seconds, formatted });
    }

    // первый запуск
    update();
    const intervalId = setInterval(update, 1000);

    // возвращаем функцию для остановки таймера
    return () => clearInterval(intervalId);
  }

  useEffect(() => {
    if (opened) getData();
  }, [opened]);

  useEffect(() => {
    if (!attemptsPerDay) return;

    const stop = startCountdownToNextDay(setTime);
    return () => stop();
  }, [attemptsPerDay]);

  return (
    <CustomModal
      opened={opened}
      onClose={closeModal}
      withCloseButton={false}
      title=""
      fz={24}
      size={600}
    >
      <Flex direction="column" p={0} gap={24}>
        <Flex direction="column" p={0} gap={16}>
          <Text p={0} fz={48} fw={500} lh="50px">
            Тестирование. <br />
            {block?.title}
          </Text>
          {!attemptsPerDay ? (
            <Text fz={16} fw={400} c="#615C69">
              Вам предоставляется <b>{block?.pivot?.max_attempts}</b> попыток
              для сдачи теста. В случае неудачи следующая попытка доступна через
              24 часа.{" "}
              {attempts?.course_block_max_attempts
                ? `Осталось попыток - ${
                    Number(attempts?.course_block_max_attempts) -
                    Number(attempts?.test_attempts_count)
                  }`
                : ""}
            </Text>
          ) : (
            <Text fz={16} fw={400} c="#615C69">
              {!maxAttempts
                ? "Вы уже использовали сегодняшнюю попытку пройти тест."
                : "Вы использовали все попытки"}
            </Text>
          )}
          {!attemptsPerDay && (
            <Flex gap={24} align="center">
              <Flex gap={8} align="center">
                <img
                  src="/img/list.svg"
                  style={{ width: 24, height: 24 }}
                  alt="list logo"
                />
                <Text fz={14} fw={400} c="#615C69">
                  30 вопросов
                </Text>
              </Flex>
              <Flex gap={8} align="center">
                <img
                  src="/img/time.svg"
                  style={{ width: 24, height: 24 }}
                  alt="time logo"
                />
                <Text fz={14} fw={400} c="#615C69">
                  30 минут
                </Text>
              </Flex>
            </Flex>
          )}
          {!attemptsPerDay && (
            <Flex gap={8}>
              <img
                src="/img/warn.svg"
                style={{ width: 24, height: 24 }}
                alt="warn logo"
              />
              <Text fz={14} fw={400} c="#615C69">
                Для успешного прохождения теста необходимо набрать{" "}
                {block?.pivot?.pass_count} баллов из 30
              </Text>
            </Flex>
          )}
        </Flex>
        {!attemptsPerDay && (
          <Flex direction="column" justify="center" gap={12}>
            <span
              className={styles.nextButton}
              style={{ textAlign: "center" }}
              onClick={() => startTest()}
            >
              Начать тест
            </span>
            <span
              className={styles.prevButton}
              style={{ textAlign: "center" }}
              onClick={() => closeModal()}
            >
              Назад
            </span>
          </Flex>
        )}
        {attemptsPerDay && (
          <Flex gap={4}>
            <Text fz={16} fw={400} c="#000">
              Следующая попытка будет доступна через:{" "}
            </Text>
            <img
              src="/img/stopwatch.svg"
              style={{ width: 20, height: 20 }}
              alt="icon"
            />
            <Text fz={16} fw={400}>
              {time?.formatted}
            </Text>
          </Flex>
        )}
        {attemptsPerDay && (
          <span
            className={styles.prevButton}
            style={{ textAlign: "center" }}
            onClick={() => closeModal()}
          >
            Закрыть
          </span>
        )}
      </Flex>
    </CustomModal>
  );
};
