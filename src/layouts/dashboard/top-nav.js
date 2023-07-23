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
import Image from "next/image";
import Logo from "../../../public/Logo.png";
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
          backgroundColor: "#00314e",
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
              <Image src={Logo} alt="logo" width={30} height={30} />
              <Box>
                <Typography
                  variant="body1"
                  component="span"
                  gutterBottom
                  sx={{
                    color: "#3ab9b2",
                    fontWeight: 400,
                    fontSize: "20px",
                  }}
                >
                  Grait
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  gutterBottom
                  sx={{ color: "white", fontWeight: 400, fontSize: "20px" }}
                >
                  Deals
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
