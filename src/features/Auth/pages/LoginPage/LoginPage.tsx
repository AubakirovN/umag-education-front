import { Anchor, Paper, Title, Text, Container, Alert } from "@mantine/core";

import { LoginForm } from "../../components/LoginForm";
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconAlertCircleFilled } from "@tabler/icons-react";
// import { setUser } from "@/slice/userSlice";
// import { useDispatch } from "react-redux";
import { LoadingBlock } from "@/components/LoadingBlock";

export function LoginPage() {
  const { t } = useTranslation("auth");
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState("");

  const handleLogin = async (values: any) => {
    try {
      console.log(values);
      // setIsLoading(true);
      // const resp = await login(values);
      // localStorage.setItem("accessToken", resp.accessToken);
      // dispatch(setPermissions(resp.permissions));
      // if (resp.permissions?.length < 2) {
      //   const user = await getUserInfo();
      //   dispatch(setUser(user));
      //   if (resp.permissions?.length > 0) {
      //     dispatch(setPermission(resp.permissions?.[0]));
      //   }
      //   setIsLoading(false);
      //   navigate("/app");
      // } else {
      //   setLoginAs(true);
      //   setIsLoading(false);
      // }
    } catch (e: any) {
      setErr(e.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        {t("loginPageTitle")}
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {t("callForActionLabel")}{" "}
        <Anchor size="sm" component="button">
          {t("callForActionText")}
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
        <LoginForm onSubmit={handleLogin} />
      </Paper>
      <LoadingBlock isLoading={isLoading} />
    </Container>
  );
}
