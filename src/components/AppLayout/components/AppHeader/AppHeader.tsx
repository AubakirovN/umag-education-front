import { Box, Button, Flex, TextInput } from "@mantine/core";
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher.tsx";
import { Logo, LogoType } from "@/components/Logo/Logo.tsx";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export function AppHeader() {
  const navigate = useNavigate();

  return (
    <Box mb={20} p={20}>
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
            <Button
              variant="subtle"
              style={{ color: "black" }}
              radius={20}
              fz={16}
            >
              Топ специалистов
            </Button>
            <LanguageSwitcher />
            <Button
              sx={{
                backgroundColor: "#FFAE1F",
                "&:hover": { backgroundColor: "#fff", color: "#000" },
              }}
              fz={16}
              radius={20}
              onClick={() => navigate("/app/profile")}
            >
              Личный кабинет
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
