import { CustomModal } from "@/components/CustomModal";
import { resetAll } from "@/slice/resetAction";
import { Flex, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import styles from './AppHeader.module.css'

export const LogoutModal = ({ opened, onClose }: any) => {
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch(resetAll());
    onClose();
  };

  return (
    <CustomModal opened={opened} onClose={onClose} title="" contentRadius={40} withCloseButton={false} size={660}>
      <Flex direction="column" gap={24}>
        <Flex direction="column" gap={16}>
          <Text fz={24} fw={500} c="#181818">
            До скорого!
          </Text>
          <Text fz={16} fw={400} c="#615C69">
            Вы действительно хотите выйти из аккаунта?<br/> Вернётесь —
            и мы продолжим с того места, где остановились.
          </Text>
        </Flex>
        <Flex direction="column" justify="center" gap={12}>
            <span
              className={styles.nextButton}
              style={{ textAlign: "center" }}
              onClick={logout}
            >
              Выйти
            </span>
            <span
              className={styles.prevButton}
              style={{ textAlign: "center", border: '1px solid #1F1F1F52' }}
              onClick={onClose}
            >
              Остаться
            </span>
          </Flex>
      </Flex>
    </CustomModal>
  );
};
