import { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import LockResetIcon from "@mui/icons-material/LockReset";
import styles from "@/styles/Layout.module.css";
import { useRouter } from "next/router";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    router.push("/auth/sign-in");
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: "primary.main",
          position: "fixed",

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
            <Box
              onClick={() => router.push("/view-site")}
              sx={{ display: "flex", cursor: "pointer" }}
            >
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
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{
              display: !lgUp ? "none" : "auto",
            }}
          >
            <Button
              variant="contained"
              sx={{
                "&:hover": {
                  boxShadow: 2,
                },
              }}
              className={styles.pro_paln_btn}
            >
              Pro plan
            </Button>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ justifyContent: "flex-end" }}
              aria-controls={Boolean(anchorEl) ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, color: "white" }}>M</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              disableScrollLock={true}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => router.push("/auth/change-password")}>
                <ListItemIcon>
                  <SyncLockIcon fontSize="small" />
                </ListItemIcon>
                Change Password
              </MenuItem>
              <MenuItem onClick={() => router.push("/auth/reset-password")}>
                <ListItemIcon>
                  <LockResetIcon fontSize="small" />
                </ListItemIcon>
                Rest password
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
