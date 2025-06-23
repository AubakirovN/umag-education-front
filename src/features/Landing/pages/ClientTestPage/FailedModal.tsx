import { CustomModal } from "@/components/CustomModal";
import { Flex, Text } from "@mantine/core";
import styles from "./FailedModal.module.css";

export const FailedModal = ({ opened, closeModal }: any) => {
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
            Тест завершен
          </Text>
          <Text fz={16} fw={400} c="#615C69">
            Время на выполнение истекло.
          </Text>
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
