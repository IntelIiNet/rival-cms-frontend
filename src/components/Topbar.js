import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styles from "@/styles/SignIn.module.css";

import { useRouter } from "next/router";
import Logo from "../../public/assets/logo.png";
import Image from "next/image";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function DrawerAppBar(props) {
  const router = useRouter();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <div className={styles["rival-cms-container"]}>
        <Typography
          variant="body1"
          component="span"
          gutterBottom
          className={` ${styles["appbar"]}`}
          style={{ color: "#2A4365", my: 2 }}
        >
          Rival
        </Typography>
        <Typography
          variant="body1"
          component="span"
          gutterBottom
          className={` ${styles["appbar"]}`}
          style={{ color: "#63B3ED", my: 2 }}
        >
          CMS
        </Typography>
      </div>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar sx={{ height: "80px" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src={Logo}
                alt="logo"
                width={30}
                height={30}
                style={{
                  transform: "rotate(358deg)",
                }}
              />

              <Box>
                <Typography
                  variant="body1"
                  component="span"
                  gutterBottom
                  className={` ${styles["appbar"]}`}
                >
                  Rival
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  gutterBottom
                  className={` ${styles["appbar"]}`}
                  style={{ color: "#63B3ED" }}
                >
                  CMS
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => router.push("/sign-in")}
              sx={{
                border: "2px solid var(--100, #F7FAFC)",
                textTransform: "none",
                "&:hover": {
                  border: "2px solid var(--100, #F7FAFC)",
                },
              }}
            >
              Sign in
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
