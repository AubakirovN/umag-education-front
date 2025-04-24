import { CustomModal } from "@/components/CustomModal";
import { LoadingBlock } from "@/components/LoadingBlock";
import { PasswordStrength, getStrength } from "@/components/PasswordStrength";
import { confirmPass, resetPass } from "@/core/api";
import { ResetPassDto } from "@/core/types";
import { openLoginModal } from "@/slice/userSlice";
import {
  Alert,
  Button,
  InputBase,
  LoadingOverlay,
  PasswordInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface RecoverModalProps {
  opened: boolean;
  onClose: () => void;
  openLogin: () => void;
}

export const RecoverModal = ({
  opened,
  onClose,
  openLogin,
}: RecoverModalProps) => {
  const { t } = useTranslation("auth");

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      phone: "",
    },

    validate: {
      phone: (value) => {
        if (!value) {
          return t("loginForm.errors.required");
        } else if (value && !/^\+7 \(\d{3}\) \d{3}-\d{4}$/.test(value)) {
          return 'Неверный формат номера телефона';
        } else {
          return null;
        }
      },
    },
  });

  const handleNumber = (value: string) => {
    form.setFieldValue("phone", value);
    if (value?.length <= 4) {
      form.setFieldValue("phone", "");
    }
  };

  const closeModal = () => {
    form.reset();
    setErr("");
    onClose();
    setEmail("");
    setSuccess(false);
  };

  const onSubmit = async (values: ResetPassDto) => {
    setIsLoading(true);
    try {
      const response = await resetPass(values);
      setEmail(response?.data?.email);
      setSuccess(true);
      setErr('')
    } catch (e: any) {
      console.error(e);
      setErr(e.response.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomModal
      opened={opened}
      onClose={closeModal}
      title="Восстановление пароля"
      withCloseButton={false}
      fz={24}
    >
      <LoadingBlock isLoading={isLoading} />
      {err ? (
        <Alert
          icon={<IconAlertCircleFilled size="1rem" />}
          title={t("loginForm.errors.title")}
          color="red"
          mb="lg"
        >
          {err}
        </Alert>
      ) : null}
      {!success ? (
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <InputBase
            label={t("loginForm.phone")}
            {...form.getInputProps("phone")}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleNumber(e.target.value)
            }
            component={IMaskInput}
            placeholder="+7 (XXX) XXX-XXXX"
            mask="+7 (000) 000-0000"
            withAsterisk
          />
          <Button
            fullWidth
            variant="outline"
            type="submit"
            mt="md"
            style={{ border: "1px solid #2DBE61", color: "#2DBE61" }}
          >
            Продолжить
          </Button>
        </form>
      ) : (
        <div>
          <Text>
            Мы отправили письмо с ссылкой для подтверждения на почту {email}.
            <br />
            Пожалуйста, перейдите по ссылке в письме, чтобы завершить
            регистрацию.
          </Text>
          <Button
            fullWidth
            onClick={closeModal}
            variant="outline"
            style={{ border: "1px solid #2DBE61", color: "#2DBE61" }}
            mt="md"
          >
            Закрыть
          </Button>
        </div>
      )}
    </CustomModal>
  );
};
