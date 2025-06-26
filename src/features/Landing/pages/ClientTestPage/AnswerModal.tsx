import { CustomModal } from "@/components/CustomModal";
import { Flex, Text } from "@mantine/core";
import { getTestResult } from "@/core/api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const AnswerModal = ({ opened, closeModal, blockTitle }: any) => {
  const navigate = useNavigate();
  const { id, blockId } = useParams();
  const [result, setResult] = useState<any>();

  const getResult = async () => {
    const response = await getTestResult(blockId as string);
    setResult(response?.data);
  };

  useEffect(() => {
    if (opened) getResult();
  }, [opened]);

  return (
    <CustomModal
      opened={opened}
      onClose={closeModal}
      withCloseButton={false}
      content="no"
      title=""
      fullscreen
      fz={24}
    >
      <Flex
        direction="column"
        justify="center"
        w="100%"
        p={24}
        style={{ backgroundColor: "#F5F5F5", borderRadius: 24 }}
      >
        <Flex w="100%" justify="space-between">
          <Flex w="100%" gap={10}>
            <img
              src="/img/started.svg"
              style={{ width: 20, height: 20 }}
              alt="icon"
            />
            <Flex direction="column" w="100%">
              <Text fz={14} fw={400}>
                Результат теста
              </Text>
              <Flex justify="space-between">
                <Text fz={20} fw={500}>
                  {blockTitle}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 32,
              height: 32,
              cursor: "pointer",
            }}
            onClick={() => navigate(`/app/courses/${id}`)}
          >
            X
          </span>
        </Flex>
        <Flex gap={8} align="center">
          <img
            src="/img/list.svg"
            style={{ width: 24, height: 24 }}
            alt="list logo"
          />
          <Text fz={14} fw={400} c="#615C69">
            Ваш результат: {result?.count_correct} / 30
          </Text>
        </Flex>
        <Flex
          direction="column"
          justify="center"
          mt={20}
          gap={40}
          px={88}
          py={50}
          style={{ background: "#fff", borderRadius: 30 }}
        >
          {result?.result?.map((item: any) => (
            <Flex direction="column" gap={24} w={600}>
              <Text fz={24} fw={300} c="#2c2c2c">
                {item?.question}
              </Text>
              {JSON.stringify(item?.chosen_answers) ===
              JSON.stringify(item?.correct_answers) ? (
                <Flex direction="column">
                  {item?.correct_answers?.map((el: any) => (
                    <Flex
                      gap={10}
                      style={{
                        backgroundColor: "#E1F9E4",
                        padding: "16px 12px",
                      }}
                    >
                      <img
                        src="/img/correct.svg"
                        style={{ width: 24, height: 24 }}
                        alt="correct icon"
                      />
                      <Text fz={18} fw={400}>
                        {el}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              ) : (
                <Flex direction="column">
                  {item?.chosen_answers?.map((el: any) => (
                    <>
                      <Text fz={20} fw={500} px={12} py={8} style={{backgroundColor: '#E8F1FE', borderRadius: 5}} c="#5C5C5C" mb={2}>
                        Ваш ответ:{" "}
                      </Text>
                      <Flex
                        gap={10}
                        style={{
                          backgroundColor: "#FFEDEB",
                          padding: "16px 12px",
                        }}
                      >
                        <img
                          src="/img/incorrect.svg"
                          style={{ width: 24, height: 24 }}
                          alt="incorrect icon"
                        />
                        <Text fz={18} fw={400}>
                          {el}
                        </Text>
                      </Flex>
                    </>
                  ))}
                  {item?.correct_answers?.map((el: any) => (
                    <>
                    <Text fz={20} fw={500} px={12} style={{backgroundColor: '#E8F1FE', borderRadius: 5 }} py={8} c="#5C5C5C" mt={24} mb={2}>
                        Правильный ответ:{" "}
                      </Text>
                    <Flex
                      gap={10}
                      style={{
                        backgroundColor: "#E1F9E4",
                        padding: "16px 12px",
                      }}
                    >
                      <img
                        src="/img/correct.svg"
                        style={{ width: 24, height: 24 }}
                        alt="correct icon"
                      />
                      <Text fz={18} fw={400}>
                        {el}
                      </Text>
                    </Flex>
                    </>
                  ))}
                </Flex>
              )}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </CustomModal>
  );
};
