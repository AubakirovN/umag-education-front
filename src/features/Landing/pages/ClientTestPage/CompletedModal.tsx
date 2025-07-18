import { CustomModal } from "@/components/CustomModal";
import { Flex, Text } from "@mantine/core";
import styles from "./FailedModal.module.css";
import { useNavigate, useParams } from "react-router-dom";

export const CompletedModal = ({
  opened,
  closeModal,
  passedTest,
  openAnswerModal,
  openCert,
}: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <CustomModal
      opened={opened}
      onClose={() => navigate(`/app/courses/${id}`)}
      withCloseButton={false}
      title=""
      fz={24}
      size={600}
      contentRadius={40}
    >
      <Flex direction="column" p={0} gap={24}>
        <Flex direction="column" p={0} gap={16}>
          <Text p={0} fz={48} fw={500} lh="50px">
             Курс пройден
          </Text>
          <Text fz={16} fw={400} c="#615C69">
            Поздравляем! Вы успешно завершили тест и этот курс.
          </Text>
          <Flex gap={8} align="center">
            <img
              src="/img/list.svg"
              style={{ width: 24, height: 24 }}
              alt="list logo"
            />
            <Text fz={14} fw={400} c="#615C69">
              Ваш результат: {passedTest?.count_correct} / 20
            </Text>
          </Flex>
          <Flex direction="column" justify="center" gap={12}>
            <span
              className={styles.nextButton}
              style={{ textAlign: "center" }}
              onClick={() => openCert()}
            >
              Перейти к вашему сертификату
            </span>
            <span
              className={styles.prevButton}
              style={{ textAlign: "center" }}
              onClick={() => {
                closeModal();
                openAnswerModal();
              }}
            >
              Посмотреть ответы
            </span>
          </Flex>
        </Flex>
      </Flex>
    </CustomModal>
  );
};
