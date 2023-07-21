/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useContext } from "react";
import Head from "next/head";
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
import { useRouter } from "next/router";
import toasterContext from "../../utils/context/tosterContext";
import axios from "axios";
import Link from "next/link";
const signIn = () => {
  const route = useRouter();
  const [userDetails, setUserDetails] = useState({});
  const fireToasterContext = useContext(toasterContext);

  const handleChange = (evnet) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  console.log("userDetails", userDetails);
  const userLogin = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/token`;

    await axios
      .post(url, userDetails)
      .then((response) => {
        console.log("Response of code login:", response);
        localStorage.setItem("token", response.data.access_token);

        const token = response.data.access_token;

        // Set the token as an HttpOnly cookie using document.cookie
        document.cookie = `token=${token}; path=/`;

        //  fireToasterContext.fireToasterHandler(true, `User is ${response.data}`);
        route.push("/view-site");
      })

      .catch((error) => {
        fireToasterContext.fireToasterHandler(
          false,
          error?.response?.data?.message
        );

        console.error("Error:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin();
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <div className={styles["rival-cms-container"]}>
          <Typography
            variant="body1"
            component="span"
            gutterBottom
            className={`${styles["link"]}`}
            style={{ color: "#3ec1b9" }}
          >
            Grait
          </Typography>
          <Typography
            variant="body1"
            component="span"
            gutterBottom
            className={`${styles["link"]}`}
            style={{ color: "#104c62" }}
          >
            Deals
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
                  onSubmit={(event) => handleSubmit(event)}
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
                          <EmailOutlinedIcon color="#2A4365" />
                        </SvgIcon>
                        <Box>
                          <Typography className={`${styles["email-address"]}`}>
                            Email Address
                          </Typography>
                        </Box>
                      </Box>
                      <TextField
                        required
                        fullWidth
                        name="email"
                        autoComplete="email"
                        onChange={(event) => handleChange(event)}
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
                          <Typography className={`${styles["email-address"]}`}>
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
                        onChange={(event) => handleChange(event)}
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
                    <Grid
                      item
                      xs={6}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        my: 3,
                      }}
                    >
                      <Link
                        href="/auth/forget-password"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Typography className={`${styles["forget-password"]}`}>
                          Forget Password ?
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid item xs={6} sx={{ my: 3 }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          height: "61px",
                          backgroundColor: "#3ec1b9",
                          color: "white",
                          fontWeight: 700,
                          borderRadius: "5px",
                          textTransform: "capitalize",
                        }}
                      >
                        Sign in
                      </Button>
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="outlined"
                    className={`${styles["dont-have-acc-btn"]}`}
                    sx={{
                      height: "61px",
                      borderRadius: "10px",
                      textTransform: "capitalize",
                    }}
                    onClick={() => route.push("/auth/sign-up")}
                  >
                    {" Don’t have & account?"}
                  </Button>
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
