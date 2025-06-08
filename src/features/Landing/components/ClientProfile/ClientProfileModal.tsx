import { CustomModal } from "@/components/CustomModal";
import { Button, Text } from "@mantine/core";

interface ClientProfileModalProps {
  opened: boolean;
  email: string;
  closeModal: () => void;
}

export const ClientProfileModal = ({
  opened,
  email,
  closeModal,
}: ClientProfileModalProps) => {
  return (
    <CustomModal
      opened={opened}
      onClose={closeModal}
      title="Изменение почты"
      withCloseButton={false}
      size={600}
      fz={24}
    >
      <div style={{ marginTop: "8px" }}>
        <Text fz={14} fw={400} color="#615C69">
          Мы отправили письмо с ссылкой для подтверждения на почту{" "}
          <b>{email}</b>. Пожалуйста, перейдите по ссылке в письме, чтобы
          изменить данные.
        </Text>
        <Button
          fullWidth
          onClick={closeModal}
          variant="outline"
          style={{
            border: "1px solid rgba(31, 31, 31, 0.32)",
            borderRadius: 100,
            color: "#1F1F1F",
            background: "#f5f5f5",
            height: 44
          }}
          mt={24}
        >
          Закрыть
        </Button>
      </div>
    </CustomModal>
  );
};
