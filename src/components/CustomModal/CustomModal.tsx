import { Modal, ScrollArea, createStyles } from "@mantine/core";
import { ReactNode } from "react";

const useStyles = createStyles(() => ({
  overflow: {
    overflowY: "visible",
  },
}));
export interface CustomModalProps {
  onClose: () => void;
  title: string;
  opened: boolean;
  size?: string | number;
  children: ReactNode;
  scrolling?: boolean;
  fz?: string | number;
  [key: string]: any;
}

export function CustomModal({
  onClose,
  title,
  opened,
  children,
  size,
  scrolling,
  fz,
  ...props
}: CustomModalProps) {
  const { classes } = useStyles();
  return (
    <Modal
      classNames={{ content: classes.overflow }}
      size={size}
      centered
      styles={{
        title: { fontSize: fz || 16 },
        header: { borderRadius: 10 },
        body: { borderRadius: 10 },
        content: {padding: 40}
      }}
      // closeOnClickOutside={false}
      onClose={onClose}
      title={title}
      opened={opened}
      scrollAreaComponent={!scrolling ? ScrollArea.Autosize : undefined}
      {...props}
    >
      {children}
    </Modal>
  );
}
