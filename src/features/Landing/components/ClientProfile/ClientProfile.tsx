import { editProfile } from "@/core/api";
import { setName } from "@/slice/userSlice";
import { RootState } from "@/store";
import { Button, Flex, InputBase, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";

export const ClientProfile = () => {
  const { t } = useTranslation("auth");
  const dispatch = useDispatch();
  const { phone, email, name } = useSelector(
    (state: RootState) => state.user.currentUser
  );
  const [isLoading, setIsLoading] = useState(false);
  const [changes, setChanges] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
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
    },
  });

  const onSubmit = async (values: any) => {
    // if (name !== values.name && email !== values.email) {
    //   console.log("1");
    // } else if (name !== values.name) {
    //   console.log("2");
    // } else if (name !== values.email) {
    //   console.log("3");
    // }
    setIsLoading(true);
    try {
      const response = await editProfile(values);
      dispatch(setName(response?.data?.name));
      setHasChanges(false);
      setChanges(!changes);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    form.setValues({
      email: email,
      name: name,
    });
  }, [changes]);

  return (
    <Flex w="100%" justify="center">
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
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
              form.setFieldValue("name", e.target.value);
              setHasChanges(true);
            }}
            withAsterisk
          />
          <TextInput
            label={t("loginForm.email")}
            placeholder={t("loginForm.enterEmail")}
            {...form.getInputProps("email")}
            onChange={(e) => {
              form.setFieldValue("email", e.target.value);
              setHasChanges(true);
            }}
            withAsterisk
          />
          <InputBase
            label={t("loginForm.phone")}
            disabled
            value={phone}
            component={IMaskInput}
            placeholder="+7 (XXX) XXX-XX-XX"
            mask="+7 (000) 000-00-00"
            withAsterisk
          />
          <Button
            loading={isLoading}
            style={{ fontSize: 16, opacity: !hasChanges ? "40%" : 1 }}
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
      </form>
    </Flex>
  );
};
