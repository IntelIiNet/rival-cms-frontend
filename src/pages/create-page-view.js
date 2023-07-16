import React from "react";
import { Layout } from "../layouts/dashboard/layout";
import Head from "next/head";
import {
  Stack,
  Container,
  SvgIcon,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";

import styles from "@/styles/CreatePageView.module.css";

const createPageView = () => {
  return (
    <Layout>
      <Head>
        <title>create page view</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container sx={{ mt: "110px" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ flexWrap: "wrap" }}
          >
            <Stack
              sx={{
                width: 540,
                display: "-webkit-inline-box",
                alignItems: "center",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g clip-path="url(#clip0_27_249)">
                    <path
                      d="M9.16669 3.33337H3.33335C2.89133 3.33337 2.4674 3.50897 2.15484 3.82153C1.84228 4.13409 1.66669 4.55801 1.66669 5.00004V16.6667C1.66669 17.1087 1.84228 17.5327 2.15484 17.8452C2.4674 18.1578 2.89133 18.3334 3.33335 18.3334H15C15.442 18.3334 15.866 18.1578 16.1785 17.8452C16.4911 17.5327 16.6667 17.1087 16.6667 16.6667V10.8334"
                      stroke="#2A4365"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.4167 2.08332C15.7482 1.7518 16.1978 1.56555 16.6667 1.56555C17.1355 1.56555 17.5852 1.7518 17.9167 2.08332C18.2482 2.41484 18.4345 2.86448 18.4345 3.33332C18.4345 3.80216 18.2482 4.2518 17.9167 4.58332L10 12.5L6.66669 13.3333L7.50002 9.99999L15.4167 2.08332Z"
                      stroke="#2A4365"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_27_249">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </SvgIcon>
              <Typography className={styles.homepage_text}>
                Home Page
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Typography className={styles.card_created_text}>
                Joe Bloggs
              </Typography>
              <Box className={styles.create_page_aurthor_container}>
                <Typography>admin</Typography>
              </Box>
            </Stack>
            <Button
              className={styles.schdule_btn_container}
              startIcon={
                <SvgIcon fontSize="small">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="#FFFCFE"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 6V12L16 14"
                      stroke="#FFFCFE"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </SvgIcon>
              }
            >
              Schedule page
            </Button>
            <Button
              className={styles.preview_btn_container}
              startIcon={
                <SvgIcon fontSize="small">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                      stroke="#FFFCFE"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="#FFFCFE"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </SvgIcon>
              }
            >
              Preview page
            </Button>
          </Stack>
          <Box className={styles.add_new_section_wrapper}>
            <IconButton>
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10 3H3V10H10V3Z"
                    stroke="#2A4365"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 3H14V10H21V3Z"
                    stroke="#2A4365"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 14H14V21H21V14Z"
                    stroke="#2A4365"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10 14H3V21H10V14Z"
                    stroke="#2A4365"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </SvgIcon>
            </IconButton>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "60%",
              }}
            >
              <Button
                className={styles.add_new_section_btn}
                startIcon={
                  <SvgIcon fontSize="small">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#2A4365"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 8V16"
                        stroke="#2A4365"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 12H16"
                        stroke="#2A4365"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </SvgIcon>
                }
              >
                Add new section
              </Button>
            </Box>
          </Box>
        </Container>
      </main>
    </Layout>
  );
};
export default createPageView;
