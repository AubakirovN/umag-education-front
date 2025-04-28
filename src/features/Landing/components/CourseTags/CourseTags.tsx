import { Box, Chip, Group } from "@mantine/core";
import "./CourseTags.css";
import { SetStateAction, useEffect, useState } from "react";
import { getRoles } from "@/core/api/courseApi";
import { MRT_PaginationState } from "mantine-react-table";

interface CourseRolesProps {
  chosenRole: string;
  setChosenRole: React.Dispatch<SetStateAction<string>>;
}

export function CourseRoles({ chosenRole, setChosenRole }: CourseRolesProps) {
  const [roles, setRoles] = useState([]);
  const [pagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 100,
  });

  const getData = async () => {
    const params = {
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
    };
    try {
      const response = await getRoles(params);
      setRoles(response?.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Box my={10}>
        <Chip.Group
          value={chosenRole}
          onChange={(val: string) => setChosenRole(val)}
        >
          <Group spacing="xs">
            <Chip
              checked={!chosenRole}
              key="all"
              variant="filled"
              styles={{
                iconWrapper: { display: "none" },
                label: {
                  border: "1px solid #000 !important",
                  backgroundColor: "#fff",
                  color: "#000",
                  fontSize: 16,
                  padding: "16px 32px",
                  "&[data-checked]": {
                    backgroundColor: "#2DBE61 !important",
                    color: "#fff",
                    padding: "16px 32px",
                    border: "1px solid #fff !important",
                  },
                },
              }}
              value=""
            >
              Все
            </Chip>
            {roles?.map((role: any, index: number) => (
              <Chip
                key={index}
                checked={Number(chosenRole) === Number(role?.id)}
                variant="filled"
                styles={{
                  iconWrapper: { display: "none" },
                  label: {
                    border: "1px solid #000 !important",
                    backgroundColor: "#fff",
                    color: "#000",
                    fontSize: 16,
                    padding: "16px 32px",
                    "&[data-checked]": {
                      backgroundColor: "#2DBE61 !important",
                      color: "#fff",
                      padding: "16px 32px",
                      border: "1px solid #fff !important",
                    },
                  },
                }}
                value={role?.id}
              >
                {role?.name}
              </Chip>
            ))}
          </Group>
        </Chip.Group>
      </Box>
    </>
  );
}
