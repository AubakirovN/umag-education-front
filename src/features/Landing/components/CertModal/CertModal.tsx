import { CustomModal } from "@/components/CustomModal";
import { Flex, Text } from "@mantine/core";
import styles from "./CertModal.module.css";
import { getCertification } from "@/core/api";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { QRCodeCanvas } from "qrcode.react";

export const CertModal = ({ opened, onClose }: any) => {
  const { id } = useParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any>();

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Сертификат ${data?.fullname}`,
  });

  const getCert = async () => {
    const response = await getCertification(id as string);
    setData(response?.data);
  };

  useEffect(() => {
    if (opened) getCert();
  }, [opened]);

  return (
    <CustomModal
      opened={opened}
      onClose={onClose}
      title=""
      withCloseButton={false}
      content="no"
      inner="no"
      contentBg={true}
      scrolling
    >
      <div
        ref={contentRef}
        style={{
          position: "relative",
          width: 842,
          height: 600,
          backgroundImage: `url('/img/cert.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* <img src="/img/cert.png" width="100%" height="100%" alt="cert img" /> */}
        <img
          style={{ position: "absolute", left: 230, top: 70 }}
          src="/img/logo.svg"
          width={190}
          height={24}
          alt="logo img"
        />
        <Text
          fz={48}
          fw={800}
          c="#1e1e1e"
          style={{
            fontFamily: "Mont, sans-serif",
            position: "absolute",
            left: 230,
            top: 80,
          }}
        >
          Сертификат
        </Text>
        <Text
          fz={16}
          fw={400}
          c="#5C5C5C"
          style={{ position: "absolute", left: 230, top: 150 }}
        >
          № {data?.number}
        </Text>
        <Text
          fz={16}
          fw={400}
          c="#5C5C5C"
          style={{ position: "absolute", left: 270, top: 210 }}
        >
          Выдан
        </Text>
        <Text
          fz={24}
          fw={700}
          c="#00802D"
          style={{
            fontFamily: "Mont-light, sans-serif",
            position: "absolute",
            left: 270,
            top: 230,
            maxWidth: 400,
          }}
        >
          {data?.fullname}
        </Text>
        <Text
          fz={16}
          fw={400}
          c="#5C5C5C"
          style={{ position: "absolute", left: 270, top: 270 }}
        >
          в подтверждение прохождения курса
        </Text>
        <Text
          fz={24}
          fw={700}
          c="#1f1f1f"
          lh="30px"
          style={{
            fontFamily: "Mont-light, sans-serif",
            position: "absolute",
            left: 270,
            top: 290,
            maxWidth: 450,
          }}
        >
          {data?.course?.title}
        </Text>
        <Flex
          direction="column"
          style={{ position: "absolute", left: 270, top: 350, maxWidth: 400 }}
        >
          <Text fz={16} fw={400} c="#5c5c5c">
            Получены навыки:
          </Text>
          {data?.course_blocks?.map((item: any) => (
            <Text fz={16} fw={400} c="#5c5c5c">
              • {item}
            </Text>
          ))}
        </Flex>
        <Text
          fz={16}
          fw={400}
          c="#5c5c5c"
          style={{ position: "absolute", left: 270, bottom: 60 }}
        >
          Алматы | {data?.date}
        </Text>
        <QRCodeCanvas
          value={data?.qr}
          size={80}
          style={{ position: "absolute", right: 60, bottom: 50 }}
        />
      </div>
      <Flex
        direction="column"
        justify="center"
        align="center"
        w="100%"
        gap={10}
      >
        <span
          className={styles.nextButton}
          style={{ textAlign: "center", width: 560 }}
          onClick={() => handlePrint()}
        >
          Распечатать сертификат
        </span>
        <span
          className={styles.prevButton}
          style={{ textAlign: "center", width: 560 }}
          onClick={() => onClose()}
        >
          Закрыть
        </span>
      </Flex>
    </CustomModal>
  );
};
