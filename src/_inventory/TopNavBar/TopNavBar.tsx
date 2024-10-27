import { Button, Stack, Typography } from "@mui/material";
import { IconBox } from "@tabler/icons-react";
import SearchBar from "../SearchBar/SearchBar";
import { Suspense } from "react";

export default function TopNavBar() {
  return (
    <Stack
      gap={3}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography color={"grey.50"} variant="mdBold">
        Inventory
      </Typography>
      <Suspense>
        <SearchBar />
      </Suspense>
      <Button
        fullWidth
        href={"https://x.com"}
        variant="darkContained"
        target="_blank"
        startIcon={<IconBox size={16} />}
        style={{ justifyContent: "flex-start" }}
      >
        Add New Product
      </Button>
    </Stack>
  );
}
