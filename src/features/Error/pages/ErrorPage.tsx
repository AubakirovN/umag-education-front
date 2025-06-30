import { RootState } from "@/store";
import { Text, Flex } from "@mantine/core";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export function ErrorPage() {
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

  return (
    <Flex direction="column" align='center' gap={24} px={40} py={32}>
      <img src="/img/404.svg" alt="404 img" width={240} height={240} />
      <Flex direction="column" align='center' gap={12}>
        <Text fz={48} fw={800} c="#1e1e1e">
          Упс! Такого курса не найдено
        </Text>
        <Text ta='center' fz={24} fw={700} c="#1f1f1f">
          Возможно, ссылка устарела, курс был перемещён или вы ошиблись
          в адресе.
        </Text>
      </Flex>
      <span
        className={styles.nextButton}
        style={{ textAlign: "center" }}
        onClick={() => navigate(isAuth ? "/app" : "/")}
      >
        Вернуться на главную
      </span>
    </Flex>
  );
}
