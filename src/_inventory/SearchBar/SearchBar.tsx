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
import { productListSearchDescription } from "@/_global/api/api";
import { useAuth } from "@/_global/components/context/AuthContext";

export default function SearchBar() {
  const [options, setOptions] = useState<any[] | null>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const {activeShop} = useAuth();
  const theme = useTheme();
  const ref = useRef<HTMLInputElement>();


  /**
   * @function trackKeyDownEvent - When user clicks (cntrl+/) shortcut
   * bring the input in focus
   */

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


  const debouncedSearch = debounce(async (query: string) => {
    if (query.length >= 2 && activeShop?.id) {
      setLoading(true);
      try {
        const results = await productListSearchDescription(activeShop.id, query);
        console.log("query",query);
        setOptions(results);
        console.log("query",query);
      } catch (error) {
        console.error('Error searching products:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setOptions([]);
    }
  }, 300);

  return (
    <Autocomplete
      fullWidth
      disablePortal
      forcePopupIcon={false}
      autoComplete
      options={options ?? []}
      loading={loading}
      loadingText="Loading..."
      getOptionLabel={(option) => `${option.name} | ${option.hsn} | ${option.category}`}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <Box component="li" key={key} {...otherProps}>
            <Typography>
              {option.name} | {option.hsn} | {option.category}
            </Typography>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search products by name, code or type"
          onChange={(e) => debouncedSearch(e.target.value)}
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
    ></Autocomplete>
  );
}
