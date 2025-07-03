import { CustomModal } from "@/components/CustomModal";
import { Flex, Text } from "@mantine/core";
import styles from "./FailedModal.module.css";

export const NotPassedModal = ({ opened, closeModal, passedTest }: any) => {
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
            Тест не пройден
          </Text>
          <Text fz={16} fw={400} c="#615C69">
            Вы не набрали нужное количество баллов.
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
          <Text fz={16} fw={400} c="#615C69">
            К сожалению, вы исчерпали все попытки на сегодня. Попробуйте снова
            завтра.
          </Text>
          <span
            className={styles.prevButton}
            style={{ textAlign: "center" }}
            onClick={() => closeModal()}
          >
            Закрыть
          </span>
        </Flex>
      </Flex>
    </CustomModal>
  );
};
