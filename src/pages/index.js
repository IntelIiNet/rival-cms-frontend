/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import Logo from "../../public/assets/logo.png";
import MainImage from "../../public/assets/Group 4.png";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${styles.main}`}
        style={{
          backgroundImage: `url('/assets/Rectangle.png')`,
          backgroundSize: "auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "100% 100%",
          height: " 60vh",
          maxWidth: "100%",
        }}
      >
        <Image
          src={MainImage}
          alt="main-img"
          style={{
            position: "absolute",
            top: "65%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            width: "35%",
            height: "40%",
            objectFit: "fill",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <CssBaseline />
          <Container component="main" sx={{ mt: 2, mb: 2 }}>
            <Stack
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Box
                sx={{
                  mr: 5,
                }}
              >
                <Link href="/" className={styles.link}>
                  Pricing
                </Link>
              </Box>
              <Box sx={{ mr: 5 }}>
                <Link href="/" className={styles.link}>
                  About
                </Link>
              </Box>
              <Button
                className={styles.sign_in_btn}
                onClick={() => router.push("/auth/sign-in")}
              >
                Sign in
              </Button>
            </Stack>
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <div className={styles["rival-cms-container"]}>
                <Typography
                  variant="h2"
                  component="span"
                  gutterBottom
                  className={`${styles["rival-cms"]} ${styles["rival-cms-text"]}`}
                >
                  Rival
                </Typography>
                <Typography
                  variant="h2"
                  component="span"
                  gutterBottom
                  className={`${styles["rival-cms"]} ${styles["rival-cms-text"]}`}
                  style={{ color: "#2D3748" }}
                >
                  CMS
                </Typography>
              </div>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                className={`${styles["sub-text"]}`}
              >
                Fresh new way to build sites
              </Typography>
              <Box className={`$ ${styles["box"]}`}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  className={`${styles["box-text"]}`}
                >
                  Get started free
                </Typography>
              </Box>
              <Typography variant="body1" className={`${styles["no-card"]}`}>
                *no card needed
              </Typography>
            </Stack>
          </Container>
          <Box
            component="footer"
            sx={{
              py: 4,
              px: 2,
              mt: "auto",
              backgroundColor: "#2A4365",
            }}
          >
            <Container>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" className={`${styles["link"]}`}>
                  Register
                </Typography>
                <Typography variant="body1" className={`${styles["link"]}`}>
                  Terms & conditions
                </Typography>
                <Typography variant="body1" className={`${styles["link"]}`}>
                  Privacy policy
                </Typography>
                <Typography variant="body1" className={`${styles["link"]}`}>
                  Documentation
                </Typography>
                <Typography variant="body1" className={`${styles["link"]}`}>
                  Pricing
                </Typography>
                <Typography variant="body1" className={`${styles["link"]}`}>
                  Our blog
                </Typography>
                <div className={styles["rival-cms-container"]}>
                  <Image
                    src={Logo}
                    alt="logo"
                    width={30}
                    height={30}
                    style={{
                      transform: "rotate(358deg)",
                    }}
                  />
                  <Typography
                    variant="body1"
                    component="span"
                    gutterBottom
                    className={`${styles["link"]}`}
                  >
                    Rival
                  </Typography>
                  <Typography
                    variant="body1"
                    component="span"
                    gutterBottom
                    className={`${styles["link"]}`}
                    style={{ color: "#63B3ED" }}
                  >
                    CMS
                  </Typography>
                </div>
              </Box>
            </Container>
          </Box>
        </Box>
      </main>
    </>
  );
}
