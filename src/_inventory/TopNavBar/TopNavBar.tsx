'use client'
import { Button, Stack, Typography } from "@mui/material";
import { IconBox } from "@tabler/icons-react";
import SearchBar from "../SearchBar/SearchBar";
import { Suspense } from "react";
import CircularLoader from "@/_global/components/LoadAndErrorBoundary/CircularLoader";
interface TopNavBarProps {
  onAddClick: () => void;
}
export default function TopNavBar({ onAddClick }: TopNavBarProps) {
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
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchBar />
      </Suspense>
      <Button
        fullWidth
        onClick={onAddClick}
        variant="darkContained"
        startIcon={<IconBox size={16} />}
        style={{ justifyContent: "flex-start" }}
      >
        Add New Product
      </Button>
    </Stack>
  );
}
