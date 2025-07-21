import { CustomModal } from "@/components/CustomModal";
import { Flex, Grid, Text } from "@mantine/core";
import styles from "./AppHeader.module.css";
import { QRCodeCanvas } from "qrcode.react";

export const ContactModal = ({ opened, onClose }: any) => {
  return (
    <CustomModal
      opened={opened}
      onClose={onClose}
      title=""
      withCloseButton={false}
      size={660}
    >
      <Flex direction="column" gap={40}>
        <Grid gutter={20}>
          <Grid.Col span={6}>
            <Flex direction="column" gap={16}>
              <Text fz={24} fw={500} c="#181818">
                Помогите нам сделать обучение лучше
              </Text>
              <Text fz={16} fw={400} c="#615C69">
                Если вы заметили ошибку в курсе, что‑то не работает
                или у вас есть идеи, как улучшить платформу — расскажите
                нам об этом.
              </Text>
              <Text fz={16} fw={400} c="#615C69">
                Мы постоянно улучшаем наш учебный портал и ценим каждый отзыв.
                Ваш опыт помогает другим учиться эффективнее.
              </Text>
            </Flex>
          </Grid.Col>
          <Grid.Col span={6}>
            <Flex direction="column" gap={20}>
              <Flex direction="column" align='center'>
                <Text ta='center' fz={16} fw={400}>
                  Почта для отзывов и предложений:
                </Text>
                <a href="mailto:academy@umag.kz">academy@umag.kz</a>
              </Flex>
              <Flex direction="column" align='center' gap={12}>
                <Text fz={16} fw={400}>
                  WhatsApp для быстрой связи:
                </Text>
                <QRCodeCanvas value="https://wa.me/77071109081" size={156} />
              </Flex>
            </Flex>
          </Grid.Col>
        </Grid>
        <span
          className={styles.prevButton}
          style={{ textAlign: "center" }}
          onClick={onClose}
        >
          Закрыть
        </span>
      </Flex>
    </CustomModal>
  );
};
