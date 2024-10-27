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

export default function SearchBar() {
  const [options, setOptions] = useState<any[] | null>([]);
  const theme = useTheme();
  const ref = useRef<HTMLInputElement>();
  const loading = options === null;

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
  const debounceSearch = useMemo(
    () =>
      debounce(async (searchText: string) => {
        try {
          const len = searchText.trim().length;
          if (len > 0 && len < 100) {
            setOptions(null);
            // const options = await getSearchToken(searchText);
            // setOptions(options);
          }
        } catch (err) {
          console.log("err", err);
          //   handleErrorMessage(err);
          setOptions([]);
        }
      }, 1000),
    [],
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
      renderOption={(props, option, state, ownerState) => {
        return <Box>Render options</Box>;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          placeholder="Search"
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
    ></Autocomplete>
  );
}
