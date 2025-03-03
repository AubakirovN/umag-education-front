import { Box, Button, Flex, Group } from "@mantine/core";
// import { useStyles } from "./styles.ts";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher.tsx";
import { Logo, LogoType } from "@/components/Logo/Logo.tsx";

export function GuestHeader() {
  // const { classes } = useStyles();

  return (
    <Box mb={20} style={{ background: "#ccc" }}>
    {/* <Box className={classes.hiddenMobile} style={{ background: "#ccc" }}> */}
      <Flex align="center" wrap="wrap" h={60} px="xl">
        <Flex
          justify="space-between"
          align="center"
          sx={{ height: "100%", width: "100%" }}
        >
          <Logo type={LogoType.dark} w={100} h={60} />
          <Group>
          <LanguageSwitcher />
          <Button color="dark">Вход</Button>
          </Group>
        </Flex>
      </Flex>
    </Box>
  );
}
