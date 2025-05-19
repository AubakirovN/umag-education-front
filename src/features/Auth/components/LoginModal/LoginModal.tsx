import { CustomModal } from "@/components/CustomModal";
import { LoadingBlock } from "@/components/LoadingBlock";
import { getUserInfo, login } from "@/core/api";
import { LoginDto } from "@/core/types";
import { setLogin, setUser } from "@/slice/userSlice";
import {
  Alert,
  Button,
  Flex,
  InputBase,
  PasswordInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";
import { useDispatch } from "react-redux";

interface LoginModalProps {
  opened: boolean;
  onClose: () => void;
  openRegister: () => void;
  openRecover: () => void;
}

export function LoginModal({
  opened,
  onClose,
  openRegister,
  openRecover,
}: LoginModalProps) {
  const { t } = useTranslation("auth");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState("");

  const form = useForm({
    initialValues: {
      phone: "",
      password: "",
    },

    validate: {
      phone: (value) => {
        if (!value) {
          return t("loginForm.errors.required");
        } else if (value && !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)) {
          return "Неверный формат номера телефона";
        } else {
          return null;
        }
      },
      password: (value) => {
        if (!value) {
          return t("loginForm.password.errors.required");
        }
        if (value.length < 8) {
          return t("loginForm.password.errors.length");
        }
        return null;
      },
    },
  });

  const closeModal = () => {
    form.reset();
    setErr("");
    onClose();
  };

  const handleNumber = (value: string) => {
    form.setFieldValue("phone", value);
    if (value?.length <= 4) {
      form.setFieldValue("phone", "");
    }
  };

  const onSubmit = async (values: LoginDto) => {
    setIsLoading(true);
    try {
      const response = await login(values);
      localStorage.setItem("accessToken", response?.data?.access_token);
      const user = await getUserInfo();
      dispatch(setLogin());
      dispatch(setUser(user));
      closeModal();
    } catch (e: any) {
      setErr(e.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomModal
      opened={opened}
      onClose={closeModal}
      title="Войти"
      fz={24}
      size={600}
    >
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
      <form
        onSubmit={form.onSubmit((values) => {
          onSubmit(values);
        })}
      >
        <InputBase
          label={t("loginForm.phone")}
          {...form.getInputProps("phone")}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleNumber(e.target.value)
          }
          styles={{ input: { height: 60, borderRadius: 12 } }}
          component={IMaskInput}
          placeholder="+7 (XXX) XXX-XX-XX"
          mask="+7 (000) 000-00-00"
          withAsterisk
        />
        <PasswordInput
          label={t("loginForm.password.label")}
          placeholder={t("loginForm.password.placeholder")}
          mt="md"
          styles={{
            input: { height: 60, borderRadius: 12 },
            innerInput: { height: 60 },
          }}
          withAsterisk
          {...form.getInputProps("password")}
        />
        <Flex align="center" my={5} gap={5}>
          <Button
            variant="subtle"
            p={0}
            onClick={() => {
              closeModal();
              openRecover();
            }}
          >
            Восстановить пароль
          </Button>
        </Flex>
        <Flex justify="flex-end" gap={10}>
          <Button
            fullWidth
            type="submit"
            variant="outline"
            c="#2DBE61"
            radius={10}
            h={60}
            style={{
              border: "1px solid #2DBE61",
              fontSize: 16,
              fontWeight: 500,
            }}
            mt="md"
          >
            {t("loginForm.submitButton")}
          </Button>
        </Flex>
        <Flex align="center" my={5} gap={5}>
          <Text>Еще нет аккаунта?</Text>
          <Button
            variant="subtle"
            onClick={() => {
              onClose();
              openRegister();
            }}
          >
            Регистрация
          </Button>
        </Flex>
      </form>
      <LoadingBlock isLoading={isLoading} />
    </CustomModal>
  );
}
