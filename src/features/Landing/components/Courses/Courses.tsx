import { RootState } from "@/store";
import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MRT_PaginationState } from "mantine-react-table";
import { getCourses } from "@/core/api/courseApi";

interface CoursesProps {
  chosenRole: string;
}

export const Courses = ({ chosenRole }: CoursesProps) => {
  const navigate = useNavigate();
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  const [courses, setCourses] = useState<any>([]);
  const data: any[] = useMemo(() => courses || [], [courses]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 15,
  });
  const [totalRowCount, setTotalRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const showMore = () => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex + 1,
    }));
  };

  const getData = async (isNewRole = false) => {
    setIsLoading(true);
    const params = {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
      role_id: chosenRole,
    };
    try {
      const response = await getCourses(params);
      if (isNewRole) {
        setCourses(response?.data);
      } else {
        setCourses((prev: any) => [...prev, ...response?.data]);
      }
      setTotalRowCount(response?.total);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getImg = (id: string) => {
    if (Number(id) === 43) {
      return "img/partner.png";
    } else if (Number(id) === 44) {
      return "img/customer.png";
    } else if (Number(id) === 45) {
      return "img/sale.png";
    } else if (Number(id) === 46) {
      return "img/hr.png";
    } else if (Number(id) === 47) {
      return "img/shop.png";
    } else if (Number(id) === 48) {
      return "img/cashier.png";
    } else {
      return "img/customer.png";
    }
  };

  useEffect(() => {
    getData(true);
  }, [chosenRole]);
  useEffect(() => {
    if (pagination.pageIndex !== 0) {
      getData();
    }
  }, [pagination.pageIndex]);

  return (
    <>
      {/* <CourseSearcher /> */}
      <Grid mt={5} gutter={32}>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        {data
          ?.slice(0, pagination.pageSize)
          ?.map((course: any, index: number) => (
            <Grid.Col span={4} key={index} h="300px">
              <Card
                // shadow="sm"
                padding="lg"
                radius={24}
                withBorder
                h="100%"
                pos="relative"
                onClick={() =>
                  navigate(
                    !isAuth
                      ? `/courses/${course?.id}`
                      : `/app/courses/${course?.id}`
                  )
                }
                sx={{
                  cursor: "pointer",
                  backgroundImage: `url(${getImg(course?.id)})`,
                  backgroundSize: "160px 160px",
                  backgroundPosition: "bottom right",
                  backgroundRepeat: "no-repeat",
                  boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.08), 0px 0px 24px 0px rgba(0, 0, 0, 0.16)',
                  "&:hover": {
                    boxShadow: '0px 0px 24px 0px rgba(2, 118, 236, 0.10)'
                  },
                }}
              >
                <Flex direction="column" justify="space-between" h="100%">
                  <Flex direction="column">
                    <Text weight={500} fz={24} lh="100%" mb={5}>
                      {course?.title}
                    </Text>
                    <Flex gap={16}>
                    <Text fz={14} color="dimmed">
                      {course?.count_lessons} уроков
                    </Text>
                    <Text fz={14} color="dimmed">
                    {course?.count_course_blocks} блока
                    </Text>
                    </Flex>
                  </Flex>
                  <Group>
                    <Badge color="orange" bg='white' variant="outline" fz={12}>
                      <span style={{color: '#000', textTransform: 'none'}}>{course?.roles?.[0]?.name}</span>
                    </Badge>
                  </Group>
                </Flex>
              </Card>
            </Grid.Col>
          ))}
      </Grid>
      {data?.length < totalRowCount && (
        <Flex justify="center" mt={20}>
          <Button
            variant="subtle"
            style={{ color: "#000", borderBottom: "#000" }}
            onClick={() => showMore()}
          >
            Еще курсы
          </Button>
        </Flex>
      )}
    </>
  );
};
