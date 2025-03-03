import { Box, Chip, Group } from "@mantine/core";

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
  return (
    <>
      <Box my={10}>
        <Chip.Group>
          <Group spacing="xs">
            {tags?.map((tag, index) => (
              <Chip
                key={index}
                defaultChecked={tag?.value === "all"}
                styles={{ iconWrapper: { display: "none" } }}
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
