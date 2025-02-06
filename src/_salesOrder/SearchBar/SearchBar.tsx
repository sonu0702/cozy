"use client";
import {
  Autocomplete,
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  KeyboardEvent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { debounce } from "lodash";
import { IconSearch } from "@tabler/icons-react";
import { billToAddressesSearch } from "@/_global/api/api";
import { Address } from "@/_salesOrder/SalesForm/type";

interface SearchBarProps {
  onAddressSelect: (address: Address) => void;
  shopId: string;
}

export default function SearchBar({ onAddressSelect, shopId }: SearchBarProps) {
  const [options, setOptions] = useState<Address[] | null>([]);
  const theme = useTheme();
  const ref = useRef<HTMLInputElement>();
  const loading = options === null;

  const trackKeyDownEvent = useCallback((e: globalThis.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "/") {
      if (ref.current) {
        ref.current.focus();
      }
    }
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("keydown", trackKeyDownEvent);
    return () => window.removeEventListener("keydown", trackKeyDownEvent);
  }, [trackKeyDownEvent]);

  const debounceSearch = useMemo(
    () =>
      debounce(async (searchText: string) => {
        try {
          const len = searchText.trim().length;
          if (len > 0 && len < 100) {
            setOptions(null);
            const addresses = await billToAddressesSearch(shopId, searchText);
            setOptions(addresses);
          }
        } catch (err) {
          console.log("err", err);
          setOptions([]);
        }
      }, 1000),
    [shopId],
  );

  return (
    <Autocomplete
      fullWidth
      disablePortal
      forcePopupIcon={false}
      autoComplete
      options={options ?? []}
      loading={loading}
      loadingText="Loading..."
      getOptionLabel={(option) => option.name}
      onChange={(_, value) => {
        if (value) {
          onAddressSelect(value);
        }
      }}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body1">{option.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {option.address}, {option.state}
            </Typography>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search Address"
          onChange={(e) => debounceSearch(e.target.value)}
          inputRef={ref}
          inputProps={{
            ...params.inputProps,
            style: {
              ...params.inputProps.style,
              fontSize: "14px",
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start" sx={{ ml: "0.5rem" }}>
                <IconSearch size={18} color={theme.palette.grey[500]} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ ml: "0.5rem", colo: "common.white" }}
              >
                {loading && <CircularProgress size={12} color={"inherit"} />}
                &nbsp;
                <Typography
                  fontSize={"14px"}
                  color={"grey.400"}
                  variant="smRegular"
                >
                  ctrl + /
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
