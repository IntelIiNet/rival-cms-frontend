import { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [searchResult, setSearchResult] = useState();
  console.log("searchResult", searchResult);
  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: "primary.main",
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: "100%",
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <MenuIcon sx={{ color: "#EDF2F7" }} />
              </IconButton>
            )}
            <Box sx={{ display: "flex" }}>
              <SvgIcon
                sx={{
                  mr: 1,
                  height: "30px",
                  width: "30px",
                  transform: "rotate(358deg)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="42"
                  height="42"
                  viewBox="0 0 42 42"
                  fill="none"
                >
                  <path
                    d="M13.0467 28.9068L13.2374 10.0503L31.0734 16.1724L13.0467 28.9068Z"
                    stroke="#EBF8FF"
                    stroke-width="2"
                  />
                  <path
                    d="M10.7387 25.6397L28.5747 31.7618L28.7654 12.9053L10.7387 25.6397Z"
                    stroke="#EBF8FF"
                    stroke-width="2"
                  />
                </svg>
              </SvgIcon>
              <Box>
                <Typography
                  variant="body1"
                  component="span"
                  gutterBottom
                  sx={{
                    color: "#FFFFFF",
                    fontWeight: 400,
                    fontSize: "20px",
                  }}
                >
                  Rival
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  gutterBottom
                  sx={{ color: "#63B3ED", fontWeight: 400, fontSize: "20px" }}
                >
                  CMS
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Button
              variant="contained"
              sx={{
                width: "82px",
                height: "32px",
                backgroundColor: "#D53F8C",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: " #fe7112",
                },
              }}
            >
              Login
            </Button>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
