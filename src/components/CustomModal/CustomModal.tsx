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
  fullscreen?: boolean;
  content?: string;
  contentRadius?: number;
  headerPadding?: number;
  withCloseButton?: boolean;
  fz?: string | number;
  [key: string]: any;
}

export function CustomModal({
  onClose,
  title,
  opened,
  children,
  content,
  fullscreen,
  size,
  scrolling,
  contentRadius,
  headerPadding,
  withCloseButton,
  fz,
  ...props
}: CustomModalProps) {
  const { classes } = useStyles();
  return (
    <Modal
      classNames={{ content: classes.overflow }}
      size={size}
      centered
      fullScreen={fullscreen}
      styles={{
        title: { fontSize: fz || 16 },
        header: { borderRadius: 10, padding: headerPadding !== undefined ? headerPadding : 16 },
        body: { borderRadius: 10 },
        content: {padding: content ? 0 : 40, borderRadius: contentRadius ? contentRadius : 4},
        close: { width:30, height: 30, fontSize: 30}
      }}
      withCloseButton={withCloseButton === false ? false : true}
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
