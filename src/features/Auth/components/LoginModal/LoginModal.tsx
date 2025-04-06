import { CustomModal } from "@/components/CustomModal";
import { LoadingBlock } from "@/components/LoadingBlock";
import { getUserInfo, login } from "@/core/api";
import { LoginDto } from "@/core/types";
import { setLogin, setUser } from "@/slice/userSlice";
import { Alert, Button, Flex, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  opened: boolean;
  onClose: () => void;
  openRegister: () => void;
}

export function LoginModal({ opened, onClose, openRegister }: LoginModalProps) {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => {
        if (value) {
          if (!/^\S+@\S+$/.test(value)) {
            return t("loginForm.errors.email");
          } else {
            return null;
          }
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
    setErr(false);
    onClose();
    navigate('/app');
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
      setErr(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomModal
      opened={opened}
      onClose={onClose}
      title={t("loginPageTitle")}
      fz={24}
    >
      {err ? (
        <Alert
          icon={<IconAlertCircleFilled size="1rem" />}
          title={t("loginForm.errors.title")}
          color="red"
          mb="lg"
        >
          {t("loginForm.errors.invalidCredentials")}
        </Alert>
      ) : null}
      <form
        onSubmit={form.onSubmit((values) => {
          onSubmit(values);
        })}
      >
        <TextInput
          label={t("loginForm.email")}
          placeholder={t("loginForm.enterEmail")}
          withAsterisk
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label={t("loginForm.password.label")}
          placeholder={t("loginForm.password.placeholder")}
          mt="md"
          withAsterisk
          {...form.getInputProps("password")}
        />
        <Flex justify="flex-end" gap={10}>
          <Button type="submit" mt="md" style={{ backgroundColor: "#2DBE61" }}>
            {t("loginForm.submitButton")}
          </Button>
          <Button variant="default" mt="md" onClick={() => openRegister()}>
            {t("loginForm.register")}
          </Button>
        </Flex>
      </form>
      <LoadingBlock isLoading={isLoading} />
    </CustomModal>
  );
}
