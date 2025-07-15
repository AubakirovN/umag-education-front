import { getCertification } from "@/core/api";
import { Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ClientCertificatePage.module.css";

export const ClientCertificatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>();

  const getCert = async () => {
    const response = await getCertification(id as string);
    setData(response?.data);
  };

  useEffect(() => {
    getCert();
  }, []);

  return (
    <Flex direction="column" align='center' w="100%" h="100%" p={24}>
      <Text ta='center' fz={32} fw={500} lh="normal">
        Это подлинный сертификат
      </Text>
      <Text ta='center' fz={16} fw={300} lh='24px' w={762}>
        Вы перешли по официальной QR-ссылке. Этот сертификат выдан через нашу
        обучающую платформу и подтверждён системой.
      </Text>
      <div
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
      </div>
      <Flex
        direction="column"
        justify="center"
        align="center"
        w="100%"
        gap={10}
      >
        <span
          className={styles.prevButton}
          style={{ textAlign: "center", width: 560, border: '1px solid #1F1F1F52' }}
          onClick={() => navigate(`/courses/${id}`)}
        >
          Закрыть
        </span>
      </Flex>
    </Flex>
  );
};
