import { Box, Button, Flex, Group, TextInput } from "@mantine/core";
// import { useStyles } from "./styles.ts";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher.tsx";
import { Logo, LogoType } from "@/components/Logo/Logo.tsx";
import { IconSearch } from "@tabler/icons-react";

export function GuestHeader() {
  // const { classes } = useStyles();

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
            <TextInput
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
            <Button variant="subtle" style={{ color: "black" }} radius={20} fz={16}>
              Топ специалистов
            </Button>
            <LanguageSwitcher />
            <Button variant="subtle" style={{ color: "black" }} radius={20} fz={16}>
              Вход
            </Button>
            <Button
              sx={{
                backgroundColor: "#FFAE1F",
                "&:hover": { backgroundColor: "#fff", color: "#000" },
              }}
              fz={16}
              radius={20}
            >
              Регистрация
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
