import { SetStateAction } from "react";
import {
  FileButton,
  Button,
  Group,
  Text,
  List,
  Image,
  Grid,
} from "@mantine/core";

interface UploadImageProps {
  files: File[];
  setFiles: React.Dispatch<SetStateAction<File[]>>;
}

export const UploadImage = ({ files, setFiles }: UploadImageProps) => {
  return (
    <>
      <Group position="center">
        <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
          {(props) => <Button {...props}>Загрузить файлы</Button>}
        </FileButton>
      </Group>

      {files.length > 0 && (
        <Text size="sm" mt="sm">
          Выбранные файлы:
        </Text>
      )}

      <List size="sm" mt={5} withPadding>
        {files.map((file, index) => (
          <>
            <List.Item key={index}>
              <Grid my={1}>
                <Grid.Col span={6}>{file.name}</Grid.Col>
                <Grid.Col span={6}>
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={100}
                    height={100}
                  />
                </Grid.Col>
              </Grid>
            </List.Item>
          </>
        ))}
      </List>
    </>
  );
};
