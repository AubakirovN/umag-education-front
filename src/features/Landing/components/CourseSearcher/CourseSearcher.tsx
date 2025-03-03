import { ActionIcon, Grid, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export const CourseSearcher = () => {
  return (
    <Grid>
      <Grid.Col span={10}>
        <TextInput
          styles={{
            input: {
              textAlign: "center",
              backgroundColor: "#EBE8E8",
              border: "none",
            },
          }}
          placeholder="Поиск"
        />
      </Grid.Col>
      <Grid.Col span={2}>
        <ActionIcon
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            backgroundColor: "#EBE8E8",
          }}
        >
          <IconSearch />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  );
};
