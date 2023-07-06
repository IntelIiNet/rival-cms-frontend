import React from "react";
import Head from "next/head";
import { Roboto } from "next/font/google";
import styles from "@/styles/SignIn.module.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import Image from "next/image";
import Logo from "../../public/assets/logo.png";
import Topbar from "../components/Topbar";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const signIn = () => {
  const handleSubmit = () => {
    console.log("handleSubmit");
  };
  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Topbar />
      <main className={`${roboto.className} ${styles.main}`}>
        <div className={styles["rival-cms-container"]}>
          <Typography
            variant="body1"
            component="span"
            gutterBottom
            className={`${roboto.className} ${styles["link"]}`}
            style={{ color: "#2A4365" }}
          >
            Rival
          </Typography>
          <Typography
            variant="body1"
            component="span"
            gutterBottom
            className={`${roboto.className} ${styles["link"]}`}
            style={{ color: "#63B3ED" }}
          >
            CMS
          </Typography>
        </div>
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Card>
            <CardContent>
              <Container>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <SvgIcon sx={{ mr: 2 }}>
                          <Person2OutlinedIcon color="#2A4365" />
                        </SvgIcon>
                        <Box>
                          <Typography
                            className={`${roboto.className} ${styles["email-address"]}`}
                          >
                            Full Name
                          </Typography>
                        </Box>
                      </Box>
                      <TextField
                        required
                        fullWidth
                        name="email"
                        autoComplete="email"
                        sx={{
                          backgroundColor: "#EDF2F7",
                          borderRadius: "5px",
                          height: "70px",
                          "& fieldset": {
                            border: "none",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <SvgIcon sx={{ mr: 2 }}>
                          <EmailOutlinedIcon color="#2A4365" />
                        </SvgIcon>
                        <Box>
                          <Typography
                            className={`${roboto.className} ${styles["email-address"]}`}
                          >
                            Email Address
                          </Typography>
                        </Box>
                      </Box>
                      <TextField
                        required
                        fullWidth
                        name="email"
                        autoComplete="email"
                        sx={{
                          backgroundColor: "#EDF2F7",
                          borderRadius: "5px",
                          height: "70px",
                          "& fieldset": {
                            border: "none",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                        }}
                      >
                        <SvgIcon sx={{ mr: 2 }}>
                          <LockOutlinedIcon color="#2A4365" />
                        </SvgIcon>
                        <Box>
                          <Typography
                            className={`${roboto.className} ${styles["email-address"]}`}
                          >
                            Password
                          </Typography>
                        </Box>
                      </Box>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        sx={{
                          backgroundColor: "#EDF2F7",
                          borderRadius: "5px",
                          height: "70px",
                          "& fieldset": {
                            border: "none",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={6} sx={{ my: 3 }}></Grid>
                    <Grid item xs={6} sx={{ my: 3 }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          height: "61px",
                          backgroundColor: "#2A4365",
                          borderRadius: "5px",
                        }}
                      >
                        Register
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </CardContent>
          </Card>
        </Container>
      </main>
    </>
  );
};

export default signIn;
