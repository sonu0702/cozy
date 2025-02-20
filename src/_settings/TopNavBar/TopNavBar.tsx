import { Button, Stack, Typography } from "@mui/material";
import { IconTruck } from "@tabler/icons-react";
// import SearchBar from "../SearchBar/SearchBar";
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
      <Typography variant="mdBold">
        Settings
      </Typography>
      {/* <Suspense>
        <SearchBar />
      </Suspense> */}
      {/* <Button
        fullWidth
        variant="darkContained"
        onClick={onAddClick}
        startIcon={<IconTruck size={16} />}
        style={{ justifyContent: "flex-start" }}
      >
        Add Suppliers
      </Button> */}
    </Stack>
  );
}
