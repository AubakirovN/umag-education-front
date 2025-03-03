import { Anchor, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


export function LoginForm({ onSubmit }: any) {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      iin: "",
      password: "",
    },

    validate: {
      iin: (value) => {
        if (!value) {
          return t("loginForm.iin.errors.required");
        }
        if (value.length !== 12) {
          return t("loginForm.iin.errors.length");
        }
        return null;
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

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
      })}
    >
      <TextInput
        label={t("loginForm.iin.label")}
        placeholder="010203123456"
        type="number"
        withAsterisk
        {...form.getInputProps("iin")}
        onInput={(e) => {
          const inputValue = (e.target as HTMLInputElement).value;
          if (inputValue.length > 12) {
            (e.target as HTMLInputElement).value = inputValue.slice(0, 12);
          }
        }}
      />
      <PasswordInput
        label={t("loginForm.password.label")}
        placeholder={t("loginForm.password.placeholder")}
        mt="md"
        withAsterisk
        {...form.getInputProps("password")}
      />
      <Group position="apart" mt="lg">
        <Anchor component="button" size="sm" onClick={() => navigate('new')}>
          {t("loginForm.firstEntry")}
        </Anchor>
      </Group>

      <Button type="submit" fullWidth mt="md">
        {t("loginForm.submitButton")}
      </Button>
    </form>
  );
}
