import { CustomModal } from "@/components/CustomModal";
import { LoadingBlock } from "@/components/LoadingBlock";
import { getUserRole, register } from "@/core/api";
import { RegisterDto } from "@/core/types";
import { Alert, Button, Flex, InputBase, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";
import styles from "./RegisterModal.module.css";

interface RegisterModalProps {
  opened: boolean;
  onClose: () => void;
}

export function RegisterModal({ opened, onClose }: RegisterModalProps) {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
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
      // password: (value) => {
      //   if (!value) {
      //     return t("loginForm.errors.required");
      //   }
      //   if (value.length < 8) {
      //     return t("loginForm.errors.length");
      //   }
      //   return null;
      // },
      phone: (value) => {
        if (!value) {
          return t("loginForm.errors.required");
        } else if (value && !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)) {
          return "Неверный формат номера телефона";
        } else {
          return null;
        }
      },
    },
  });

  const handleNumber = (value: string) => {
    form.setFieldValue("phone", value);
  };

  const closeModal = () => {
    form.reset();
    setErr("");
    onClose();
    setSuccess(false);
    setEmail("");
  };

  const onSubmit = async (values: RegisterDto) => {
    setIsLoading(true);
    try {
      const response = await register(values);
      setEmail(response?.data?.email);
      // closeModal();
      setSuccess(true);
      setErr("");
    } catch (e: any) {
      setErr(e.response.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomModal
      opened={opened}
      onClose={closeModal}
      title="Регистрация"
      size={600}
      contentRadius={40}
      headerPadding={0}
      fz={24}
    >
      {err ? (
        <Alert
          icon={<IconAlertCircleFilled size="1rem" />}
          title={t("loginForm.errors.title")}
          color="red"
          mt={24}
          mb="lg"
        >
          {err}
        </Alert>
      ) : null}
      {!success ? (
        <form
          onSubmit={form.onSubmit((values) => {
            onSubmit(values);
          })}
        >
          <Flex direction="column" gap={14} mt={!err ? 24 : 0}>
            <TextInput
              label={t("loginForm.fio")}
              placeholder="Введите ваше полное имя"
              {...form.getInputProps("name")}
              styles={{
                input: { height: 60, borderRadius: 12, fontSize: 16 },
                label: { fontSize: 16 },
              }}
              withAsterisk
            />
            <TextInput
              label={t("loginForm.email")}
              placeholder={t("loginForm.enterEmail")}
              {...form.getInputProps("email")}
              styles={{
                input: { height: 60, borderRadius: 12, fontSize: 16 },
                label: { fontSize: 16 },
              }}
              withAsterisk
            />
            <InputBase
              label={t("loginForm.phone")}
              {...form.getInputProps("phone")}
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                setErr("");
                // setRole("");
                handleNumber(e.target.value);
                if (e.target.value?.length === 17) {
                  try {
                    await getUserRole({ phone: e.target.value });
                    // setRole(response?.data?.role_name);
                  } catch (e: any) {
                    setErr(e.response.data?.message);
                  }
                }
              }}
              styles={{
                input: { height: 60, borderRadius: 12, fontSize: 16 },
                label: { fontSize: 16 },
              }}
              component={IMaskInput}
              placeholder="+7 (XXX) XXX-XX-XX"
              mask="+7 (000) 000-00-00"
              withAsterisk
            />
          </Flex>
          <button
            type="submit"
            style={{
              border: "none",
              width: "100%",
              marginTop: 24,
              fontSize: 15,
              fontWeight: 500,
            }}
            className={styles.nextButton}
          >
            Подать заявку
          </button>
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
      <LoadingBlock isLoading={isLoading} />
    </CustomModal>
  );
}
