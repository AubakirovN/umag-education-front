import { RootState } from "@/store";
import { Button, Flex, InputBase, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";
import { useSelector } from "react-redux";

export const ClientProfile = () => {
  const { t } = useTranslation("auth");
  const { phone, email, name } = useSelector(
    (state: RootState) => state.user.currentUser
  );
  const [hasChanges, setHasChanges] = useState(false);

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
    if (value?.length <= 4) {
      form.setFieldValue("phone", "");
    }
  };

  useEffect(() => {
    form.setValues({
      phone: phone,
      email: email,
      name: name,
    });
  }, []);

  return (
    <Flex w="100%" justify="center">
      <Flex
        direction="column"
        style={{ width: 600, padding: 40, borderRadius: 10 }}
        gap={24}
      >
        <TextInput
          label={t("loginForm.fio")}
          placeholder="Введите ваше полное имя"
          {...form.getInputProps("name")}
          onChange={(e) => {
            form.setFieldValue('name', e.target.value);
            setHasChanges(true);
          }}
          withAsterisk
        />
        <TextInput
          label={t("loginForm.email")}
          placeholder={t("loginForm.enterEmail")}
          {...form.getInputProps("email")}
          onChange={(e) => {
            form.setFieldValue('email', e.target.value);
            setHasChanges(true);
          }}
          withAsterisk
        />
        <InputBase
          label={t("loginForm.phone")}
          disabled
          {...form.getInputProps("phone")}
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            handleNumber(e.target.value);
          }}
          component={IMaskInput}
          placeholder="+7 (XXX) XXX-XX-XX"
          mask="+7 (000) 000-00-00"
          withAsterisk
        />
        <Button
          style={{ fontSize: 16, opacity: !hasChanges ? '40%' : 1 }}
          c="#fff !important"
          disabled={!hasChanges}
          bg="#2DBE61 !important"
          radius={100}
          fullWidth
          type="submit"
          mt="md"
        >
          Сохранить изменения
        </Button>
      </Flex>
    </Flex>
  );
};
