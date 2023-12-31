/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState } from "react";
import Head from "next/head";
import styles from "@/styles/SignIn.module.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Topbar from "../../components/Topbar";
import axios from "axios";
import toasterContext from "../../utils/context/tosterContext";
import { useRouter } from "next/router";

const signUp = () => {
  const router = useRouter();
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [openEnterCodeDialog, setOpenEnterCodeDialog] = useState(false);
  const fireToasterContext = useContext(toasterContext);

  const handleChange = (evnet) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const userLogin = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/users`, userDetails)
      .then((response) => {
        setLoading(false);
        setOpenEnterCodeDialog(true);
        console.log("Response:", response);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    userLogin();
    console.log("userDetails", userDetails);
    console.log("process.env", process.env.NEXT_PUBLIC_API_URL);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenEnterCodeDialog(false);
  };

  const handleConfimationCode = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/verifyCode`;
    const codeVerificationData = {
      code: code,
      email: userDetails.email,
    };
    axios
      .post(url, codeVerificationData)
      .then((response) => {
        console.log("Response of code varificatiion:", response);
        fireToasterContext.fireToasterHandler(true, `User is ${response.data}`);
        localStorage.setItem("loggedInUser", JSON.stringify(response));
        router.push("/auth/sign-in");
      })

      .catch((error) => {
        console.error("Error:", error);
      });
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
      <main className={`${styles.main}`}>
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
                          <Typography className={`${styles["email-address"]}`}>
                            Full Name
                          </Typography>
                        </Box>
                      </Box>
                      <TextField
                        required
                        fullWidth
                        name="name"
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
                          <LocalPhoneIcon color="#2A4365" />
                        </SvgIcon>
                        <Box>
                          <Typography className={`${styles["email-address"]}`}>
                            Mobile
                          </Typography>
                        </Box>
                      </Box>
                      <TextField
                        required
                        fullWidth
                        name="mobile"
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

                    <Grid item xs={6} sx={{ my: 3 }}></Grid>
                    <Grid item xs={6} sx={{ my: 3 }}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          height: "61px",
                          backgroundColor: "#3ec1b9",
                          borderRadius: "5px",
                          color: "white",
                          textTransform: "capitalize",
                          fontWeight: "bold",
                        }}
                      >
                        {loading ? "Loading..." : "Register"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </CardContent>
          </Card>
          {openEnterCodeDialog && (
            <Dialog
              aria-labelledby="customized-dialog-title"
              open={open}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle
                id="customized-dialog-title"
                sx={{
                  display: "flex",
                  alignItems: "  center",
                  justifyContent: "space-between",
                  backgroundColor: "primary.main",
                  color: "white",
                  py: 1.5,
                }}
              >
                Enter code
                <IconButton
                  onClick={handleCloseConfirmationDialog}
                  sx={{
                    backgroundColor: "primary.main",
                  }}
                >
                  <ClearIcon sx={{ color: "white" }} />
                </IconButton>
              </DialogTitle>
              <DialogContent
                dividers
                sx={{
                  Height: 400,
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Typography>
                    {` We emailed a code to ${userDetails.email} . Please enter the
                code to sign in.`}
                  </Typography>
                </Box>

                <Box component="form" noValidate autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        label="Confirmation Code"
                        fullWidth
                        placeholder="Enter Code"
                        variant="outlined"
                        name="code"
                        onChange={(event) => setCode(event.target.value)}
                        InputProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleConfimationCode}
                  autoFocus
                  sx={{
                    backgroundColor: "#3ec1b9",
                    color: "white",
                    width: "135px",
                    height: "42px",
                    "&:hover": {
                      boxShadow: 4,
                      backgroundColor: "#3ec1b9",
                      color: "white",
                    },
                  }}
                >
                  Next
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Container>
      </main>
    </>
  );
};

export default signUp;
