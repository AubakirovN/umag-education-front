import { Box, Chip, Group } from "@mantine/core";
import "./CourseTags.css";
import { useState } from "react";

const tags = [
  {
    value: "all",
    label: "Все курсы",
  },
  {
    value: "partner",
    label: "Партнер",
  },
  {
    value: "technic",
    label: "Технический специалист",
  },
  {
    value: "manager",
    label: "Менеджер по продажам",
  },
  {
    value: "hr",
    label: "HR-менеджер",
  },
  {
    value: "user",
    label: "Пользователь",
  },
];

export function CourseTags() {
  const [chosenTag, setChosenTag] = useState<any>("all");
  return (
    <>
      <Box my={10}>
        <Chip.Group value={chosenTag} onChange={(val) => setChosenTag(val)}>
          <Group spacing="xs">
            {tags?.map((tag, index) => (
              <Chip
                key={index}
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
                value={tag?.value}
              >
                {tag?.label}
              </Chip>
            ))}
          </Group>
        </Chip.Group>
      </Box>
    </>
  );
}
