import { completeTest, getCourse } from "@/core/api";
import { decrementTimer, resetTimer } from "@/slice/courseSlice";
import { RootState } from "@/store";
import { Button, Checkbox, Flex, Progress, Text } from "@mantine/core";
import { addSeconds, differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FailedModal } from "./FailedModal";
import { PassedModal } from "./PassedModal";
import { AnswerModal } from "./AnswerModal";
import { NotPassedModal } from "./NotPassedModal";

export const ClientTestPage = () => {
  const dispatch = useDispatch();
  const { id, blockId } = useParams();
  const navigate = useNavigate();
  const { currentTest } = useSelector((state: RootState) => state.course.test);
  const [currentId, setCurrentId] = useState<any>(0);
  const [answers, setAnswers] = useState<any>([]);
  const [blockTitle, setBlockTitle] = useState<string>("");
  const [chosenAnswers, setChosenAnswers] = useState<any>({
    question_id: null,
    answers: [],
  });
  const [lastQuestion, setLastQuestion] = useState(false);
  const { remainingSeconds, isRunning } = useSelector(
    (state: RootState) => state.course.test
  );
  const [passed, setPassed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [passedTest, setPassedTest] = useState<any>(null);
  const [notPassed, setNotPassed] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);

  const openAnswerModal = () => {
    setPassed(false);
    setAnswerModal(true);
  };
  const finishTest = async (body: any) => {
    try {
      const resp = await completeTest(body);
      if (resp?.data?.status === "failed") {
        if (JSON.parse(resp?.data?.chosen_answers)?.length > 0) {
          setNotPassed(true);
          setPassedTest(resp?.data);
        } else {
          setFailed(true);
        }
      } else if (resp?.data?.status === "success") {
        setPassed(true);
        setPassedTest(resp?.data);
      }
      dispatch(resetTimer());
    } catch (e) {
      console.error(e);
    }
  };

  const formatTimeLeft = (timestampSeconds: number) => {
    const now = new Date();
    const future = addSeconds(now, timestampSeconds);

    let totalSeconds = differenceInSeconds(future, now);

    if (totalSeconds < 0) totalSeconds = 0;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(seconds).padStart(2, "0");

    return `${paddedMinutes}:${paddedSeconds}`;
  };

  const handleClick = () => {
    const newAnswers = [...answers, chosenAnswers];

    if (lastQuestion) {
      finishTest({
        chosen_answers: newAnswers,
        course_block_id: blockId,
        course_id: id,
      });
    }

    setAnswers(newAnswers);
    setChosenAnswers(null);

    setCurrentId((prev: any) => {
      if (prev + 1 >= currentTest?.length - 1) {
        setLastQuestion(true);
      }
      return prev + 1;
    });
  };

  const getBlockInfo = async () => {
    const response = await getCourse(id as string);
    setBlockTitle(
      response?.data?.course_blocks?.find(
        (item: any) => Number(item?.id) === Number(blockId)
      )?.title
    );
  };

  useEffect(() => {
    getBlockInfo();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (remainingSeconds <= 0 && isRunning === true) {
      finishTest({
        chosen_answers: [],
        course_block_id: blockId,
        course_id: id,
      });
    }
  }, [remainingSeconds]);

  return (
    <Flex
      direction="column"
      justify="center"
      w="100%"
      p={24}
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <Flex w="100%" gap={10}>
        <img
          src="/img/started.svg"
          style={{ width: 20, height: 20 }}
          alt="icon"
        />
        <Flex direction="column" w="100%">
          <Text fz={14} fw={400}>
            Тест
          </Text>
          <Flex justify="space-between">
            <Text fz={20} fw={500}>
              {blockTitle}
            </Text>
            <Flex gap={4} align="center">
              <img
                src="/img/stopwatch.svg"
                style={{ width: 20, height: 20 }}
                alt="icon"
              />
              <Text fz={16} fw={400}>
                {formatTimeLeft(remainingSeconds)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Progress
        my={20}
        styles={{ bar: { background: "#91D0FF" } }}
        value={Math.ceil((answers?.length / currentTest?.length) * 100) || 0}
        label={`${answers?.length} / ${currentTest?.length}`}
        size="xl"
        radius="xl"
      />
      <Flex
        direction="column"
        align="center"
        px={88}
        py={50}
        w="100%"
        style={{ borderRadius: 30, backgroundColor: "#fff" }}
      >
        <Flex direction="column" align="stretch" w={600}>
          <Flex direction="column">
            <Text fz={24} fw={300}>
              {currentTest?.[currentId]?.question}
            </Text>
            <Flex direction="column" my={24}>
              <Checkbox.Group
                value={chosenAnswers?.answers || []}
                onChange={(value: any) =>
                  setChosenAnswers({
                    question_id: currentTest?.[currentId]?.id,
                    answers: value,
                  })
                }
              >
                <Flex direction="column">
                  {currentTest?.[currentId]?.answers?.length > 0 &&
                    JSON.parse(currentTest?.[currentId]?.answers)?.map(
                      (el: any, index: number) => (
                        <Checkbox
                          key={index}
                          p={16}
                          value={el?.name}
                          label={el?.name}
                        />
                      )
                    )}
                </Flex>
              </Checkbox.Group>
            </Flex>
            <Flex justify="center">
              <Button
                style={{
                  fontSize: 16,
                  opacity: chosenAnswers?.answers?.length > 0 ? 1 : "40%",
                }}
                c="#fff !important"
                disabled={chosenAnswers?.answers?.length === 0}
                bg="#2DBE61 !important"
                radius={100}
                mt="md"
                onClick={handleClick}
              >
                {!lastQuestion ? "Подтвердить и продолжить" : "Закончить тест"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <FailedModal
        opened={failed}
        closeModal={() => navigate(`/app/courses/${id}`)}
      />
      <PassedModal
        opened={passed}
        passedTest={passedTest}
        closeModal={() => navigate(`/app/courses/${id}`)}
        openAnswerModal={openAnswerModal}
      />
      <AnswerModal
        opened={answerModal}
        blockTitle={blockTitle}
        closeModal={() => navigate(`/app/courses/${id}`)}
      />
      <NotPassedModal
        opened={notPassed}
        passedTest={passedTest}
        closeModal={() => navigate(`/app/courses/${id}`)}
      />
    </Flex>
  );
};
