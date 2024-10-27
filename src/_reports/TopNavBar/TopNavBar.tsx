import { Button, Stack, Typography } from "@mui/material";
import { IconBrandX } from "@tabler/icons-react";
import SearchBar from "../SearchBar/SearchBar";

export default function TopNavBar() {
  return (
    <Stack
      gap={2}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography color={"grey.50"} variant="mdBold">
        Reports
      </Typography>
      {/* <SearchBar /> */}
      <Button
        fullWidth
        href={"https://x.com"}
        variant="darkContained"
        target="_blank"
        startIcon={<IconBrandX size={16} />}
        style={{ justifyContent: "flex-start" }}
      >
        Print Reports
      </Button>
    </Stack>
  );
}
