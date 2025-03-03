import { Text, Container } from "@mantine/core";
import { useStyles } from "./styles.tsx";
import { Logo, LogoType } from "@/components/Logo/Logo.tsx";

export function GuestFooter() {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container className={classes.afterFooter}>
        <Logo type={LogoType.light} />
        <Text color="dimmed" size="sm">
          Copyright Ⓒ 2025 . All rights reserved
        </Text>
      </Container>
    </footer>
  );
}
