import { Button, Stack, Typography } from "@mui/material";
import { IconShoppingCart } from "@tabler/icons-react";
// import SearchBar from "../SearchBar/SearchBar";
import { Suspense } from "react";


interface TopNavBarProps {
  onOpenForm: () => void;
}

export default function TopNavBar({onOpenForm} : TopNavBarProps) {
  return (
    <Stack
      gap={3}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography variant="mdBold">
        Purchase Invoices
      </Typography>
      <Button
        fullWidth
        onClick={() => onOpenForm()}
        startIcon={<IconShoppingCart size={16} />}
        style={{ justifyContent: "flex-start" }}
      >
        New Purchase Invoice (Shift + A)
      </Button>
    </Stack>
  );
}
