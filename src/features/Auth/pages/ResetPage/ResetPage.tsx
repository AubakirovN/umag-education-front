import { CustomModal } from "@/components/CustomModal";
import { LoadingBlock } from "@/components/LoadingBlock";
import { PasswordStrength, getStrength } from "@/components/PasswordStrength";
import { resetPass } from "@/core/api";
import { Courses } from "@/features/Landing/components/Courses";
import { openLoginModal } from "@/slice/userSlice";
import { Alert, Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertCircleFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPage = () => {
  const { id } = useParams();
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [opened, setOpened] = useState(true);
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      reset_token: id as string,
      password: "",
      passwordRepeat: "",
    },

    validate: {
      password: (value) => {
        if (!value) {
          return t("loginForm.password.errors.required");
        }
        const strength = getStrength(value);
        // const strength = getStrength(value, t);
        if (strength < 100) {
          return t("loginForm.password.errors.strength");
        }
        return null;
      },
      passwordRepeat: (value) => {
        if (!value) {
          return t("loginForm.password.errors.required");
        }
        if (value !== form.values.password) {
          return t("loginForm.password.errors.match");
        }
        return null;
      },
    },
  });
  const handlePasswordChange = (newValue: string) => {
    form.setFieldValue("password", newValue);
  };

  const onClose = () => {
    form.reset();
    setOpened(false);
    setErr("");
    navigate("/");
  };

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      await resetPass(values);
      onClose();
      dispatch(openLoginModal());
    } catch (e: any) {
      console.error(e);
      setErr(e.response.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Courses />
      <CustomModal
        opened={opened}
        onClose={onClose}
        title="Создание нового пароля"
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
        <form
          onSubmit={form.onSubmit((values) => {
            onSubmit(values);
          })}
        >
          <PasswordStrength onPasswordChange={handlePasswordChange} />
          <PasswordInput
            label="Подтверждение пароля"
            placeholder="Подтвердите новый пароль"
            mt="md"
            withAsterisk
            {...form.getInputProps("passwordRepeat")}
          />
          <Button
            fullWidth
            variant="outline"
            type="submit"
            mt="md"
            style={{ border: "1px solid #2DBE61", color: "#2DBE61" }}
          >
            Создать пароль
          </Button>
        </form>
      </CustomModal>
    </>
  );
};
