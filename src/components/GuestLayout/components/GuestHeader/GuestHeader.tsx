import { Box, Button, Flex } from "@mantine/core";
// import { useStyles } from "./styles.ts";
import { Logo, LogoType } from "@/components/Logo/Logo.tsx";
import { LoginModal } from "@/features/Auth/components/LoginModal";
import { useState } from "react";
import { RegisterModal } from "@/features/Auth/components/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { closeLoginModal, openLoginModal } from "@/slice/userSlice";
import { RecoverModal } from "@/features/Auth/components/RecoverModal";

export function GuestHeader() {
  // const { classes } = useStyles();
  // const [loginModal, setLoginModal] = useState(false);
  const dispatch = useDispatch();
  const {loginModal} = useSelector((state: RootState) => state.user);
  const [registerModal, setRegisterModal] = useState(false);
  const [recoverModal, setRecoverModal] = useState(false);

  const closeLogin= () => {
    dispatch(closeLoginModal())
  };
  const openLogin = () => {
    dispatch(openLoginModal())

  }

  return (
    <Box mb={20} p={20}>
      {/* <Box className={classes.hiddenMobile} style={{ background: "#ccc" }}> */}
      <Flex align="center" wrap="wrap">
        <Flex
          justify="space-between"
          align="center"
          sx={{ height: "100%", width: "100%" }}
        >
          <Logo type={LogoType.dark} w={100} h={60} />
          <Flex gap={20} wrap="wrap">
            {/* <TextInput
              styles={{
                input: {
                  textAlign: "center",
                  fontSize: 16,
                  borderRadius: 20,
                },
              }}
              rightSection={<IconSearch size={14} color="#999" />}
              placeholder="Поиск"
            />
            <Button
              variant="subtle"
              style={{ color: "black" }}
              radius={20}
              fz={16}
            >
              Топ специалистов
            </Button> */}
            {/* <LanguageSwitcher /> */}
            <Button
              variant="subtle"
              style={{ color: "black" }}
              radius={20}
              fz={16}
              onClick={() => openLogin()}
            >
              Вход
            </Button>
            <Button
              sx={{
                backgroundColor: "#FFAE1F",
                "&:hover": { backgroundColor: "#fff", color: "#000" },
              }}
              fz={16}
              radius={20}
              onClick={() => setRegisterModal(true)}
            >
              Регистрация
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <LoginModal
        opened={loginModal}
        onClose={() => closeLogin()}
        openRegister={() => setRegisterModal(true)}
        openRecover={() => setRecoverModal(true)}
      />
      <RegisterModal
        opened={registerModal}
        onClose={() => setRegisterModal(false)}
      />
      <RecoverModal
        opened={recoverModal}
        onClose={() => setRecoverModal(false)}
        // openLogin={() => dispatch(openLoginModal())}
      />
    </Box>
  );
}
