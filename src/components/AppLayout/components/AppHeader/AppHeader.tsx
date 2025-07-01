import { Box, Flex } from "@mantine/core";
import { Logo, LogoType } from "@/components/Logo/Logo.tsx";
import { useNavigate } from "react-router-dom";
import styles from './AppHeader.module.css'
import { useState } from "react";
import { LogoutModal } from "./LogoutModal";
import { ContactModal } from "./ContactModal";

export function AppHeader() {
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);

  // const user = useSelector((state: RootState) => state.user.currentUser);
  return (
    <Box p={10} h={64}>
      <Flex align="center" wrap="wrap">
        <Flex
          justify="space-between"
          align="center"
          sx={{ height: "100%", width: "100%" }}
        >
          <Logo type={LogoType.dark} w={220} h={24} />
          <Flex gap={20} wrap="wrap">
              <span
                className={styles.appHeaderButton}
                  onClick={() => setContactModal(true)}
                >
                  Связаться с нами
                </span>
                <span
                className={styles.appHeaderButton}
                  onClick={() => navigate('/app/profile')}
                >
                  Профиль
                </span>
                <span
                className={styles.appHeaderButton}
                  onClick={() => setLogoutModal(true)}
                >
                  Выход
                </span>
          </Flex>
        </Flex>
      </Flex>
      <ContactModal opened={contactModal} onClose={() => setContactModal(false)} />
      <LogoutModal opened={logoutModal} onClose={() => setLogoutModal(false)} />
    </Box>
  );
}
