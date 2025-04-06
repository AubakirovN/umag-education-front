import { CustomModal } from "@/components/CustomModal";
import { LoadingBlock } from "@/components/LoadingBlock";
import { register } from "@/core/api";
import { RegisterDto } from "@/core/types";
import {
  Alert,
  Button,
  Flex,
  InputBase,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";

interface RegisterModalProps {
  opened: boolean;
  onClose: () => void;
  openLogin: () => void;
}

export function RegisterModal({
  opened,
  onClose,
  openLogin,
}: RegisterModalProps) {
  const { t } = useTranslation("auth");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },

    validate: {
      name: (value) => {
        if (value.length < 1) {
          return t("loginForm.errors.required");
        } else {
          return null;
        }
      },
      email: (value) => {
        if (value) {
          if (!/^\S+@\S+$/.test(value)) {
            return t("form.validate.email");
          } else {
            return null;
          }
        } else {
          return t("loginForm.errors.required");
        }
      },
      password: (value) => {
        if (!value) {
          return t("loginForm.errors.required");
        }
        if (value.length < 8) {
          return t("loginForm.errors.length");
        }
        return null;
      },
      phone: (value) => {
        if (!value) {
          return t("loginForm.errors.required");
        } else if (value && !/^\+7 \(\d{3}\) \d{3}-\d{4}$/.test(value)) {
          return t("form.validate.phoneNumber");
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
    setErr(false);
    onClose();
    openLogin();
  };

  const onSubmit = async (values: RegisterDto) => {
    setIsLoading(true);
    try {
      await register(values);
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
          label={t("loginForm.fio")}
          placeholder={t("loginForm.enterFio")}
          {...form.getInputProps("name")}
          withAsterisk
        />
        <TextInput
          label={t("loginForm.email")}
          placeholder={t("loginForm.enterEmail")}
          {...form.getInputProps("email")}
          withAsterisk
        />
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
        <PasswordInput
          label={t("loginForm.password.label")}
          placeholder={t("loginForm.password.placeholder")}
          mt="md"
          withAsterisk
          {...form.getInputProps("password")}
        />
        <Flex justify="flex-end" gap={10}>
          <Button type="submit" style={{ backgroundColor: "#2DBE61" }} mt="md">
            {t("loginForm.register")}
          </Button>
          <Button variant="default" mt="md" onClick={() => openLogin()}>
            {t("loginForm.submitButton")}
          </Button>
        </Flex>
      </form>
      <LoadingBlock isLoading={isLoading} />
    </CustomModal>
  );
}
