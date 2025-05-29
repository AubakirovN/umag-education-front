import { Box, Flex } from "@mantine/core";
import { Logo, LogoType } from "@/components/Logo/Logo.tsx";
import { useDispatch } from "react-redux";
import { resetAll } from "@/slice/resetAction";
import { useNavigate } from "react-router-dom";
import styles from './AppHeader.module.css'

export function AppHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const user = useSelector((state: RootState) => state.user.currentUser);

  const logout = () => {
    localStorage.removeItem('accessToken');
    dispatch(resetAll());
  };

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
            {/* <Menu shadow="md" width={200}>
              <Menu.Target> */}
                <span
                className={styles.appHeaderButton}
                  onClick={() => navigate('/app/profile')}
                >
                  Профиль
                </span>
                <span
                className={styles.appHeaderButton}
                  onClick={logout}
                >
                  Выход
                </span>
              {/* </Menu.Target> */}

              {/* <Menu.Dropdown>
                <Menu.Label>{user?.email}</Menu.Label>
                <Menu.Item
                  icon={<IconSettings size={14} />}
                  onClick={() => navigate("/app/profile")}
                >
                  Профиль
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  icon={<IconDoorExit size={14} />}
                  onClick={logout}
                >
                  Выход
                </Menu.Item>
              </Menu.Dropdown>
            </Menu> */}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
