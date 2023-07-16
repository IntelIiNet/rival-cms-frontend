import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Head from "next/head";
import MenuIcon from "@mui/icons-material/Menu";
import { Layout } from "../layouts/dashboard/layout";
import styles from "@/styles/Files.module.css";
import Image from "next/image";
import TablePhoto from "../../public/assets/photo.png";

const Files = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const [activeButton, setActiveButton] = useState("Images");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  console.log("searchResult", searchResult, loading);

  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(files));
    if (files.length < 1) {
      localStorage.removeItem("images");
    }
  }, [files]);

  const handleChangeSelectImage = (acceptedFiles) => {
    const updatedFiles = [...files];

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.addEventListener("load", () => {
        const newImage = {
          url: reader.result,
        };
        updatedFiles.push(newImage);
        setFiles(updatedFiles);
      });
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleChangeSelectImage,
    accept: "image/*, audio/*, video/*",
  });
  return (
    <Layout>
      <Head>
        <title>Files</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container sx={{ mt: "135px" }}>
          {/* file uplaod  */}
          <Box {...getRootProps()} style={{ marginTop: 16 }}>
            <input {...getInputProps()} />
            <Box className={styles.file_upload_btn_wrapper}>
              <Box>
                <Button
                  variant="contained"
                  component="label"
                  disabled={loading}
                  className={styles.file_upload_btn}
                >
                  Click to Upload
                  <input multiple type="file" hidden {...getInputProps()} />
                </Button>
              </Box>
              <Box>
                <Typography className={styles.file_upload_text}>
                  Drag & drop multiple files to upload
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* table */}
          <TableContainer sx={{ maxHeight: 620 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ border: "none" }}>
                    <Tooltip title="Search">
                      <OutlinedInput
                        defaultValue=""
                        placeholder="Search for file"
                        startAdornment={
                          <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="small">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                                  stroke="#718096"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M21 21L16.65 16.65"
                                  stroke="#718096"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </SvgIcon>
                          </InputAdornment>
                        }
                        onChange={(event) =>
                          setSearchResult(event.target.value)
                        }
                        sx={{
                          borderBottom: "1px solid #E2E8F0",
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "transparent",
                          },
                          "& fieldset": { border: "none" },
                        }}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "right", border: "none" }}
                  ></TableCell>

                  <TableCell sx={{ textAlign: "right", border: "none" }}>
                    <Button
                      disableRipple
                      sx={{
                        "&:hover": {
                          backgroundColor: "transparent",
                          cursor: "default",
                        },
                      }}
                      className={styles.filter_tag}
                    >
                      Filter
                    </Button>
                    <Button
                      sx={{
                        background:
                          activeButton === "Images" ? "#2c5282" : "transparent",
                        color:
                          activeButton === "Images" ? "#F7FAFC" : "#2C5282",
                        border: "1px solid #2C5282",
                        "&:hover": {
                          background:
                            activeButton === "Images"
                              ? "#2c5282"
                              : "transparent",
                          color:
                            activeButton === "Images" ? "#F7FAFC" : "#2C5282",
                        },
                      }}
                      className={styles.filter_img_btn}
                      onClick={() => handleButtonClick("Images")}
                    >
                      Images
                    </Button>
                    <Button
                      sx={{
                        background:
                          activeButton === "Files" ? "#2c5282" : "transparent",
                        color: activeButton === "Files" ? "#F7FAFC" : "#2C5282",
                        border: "1px solid #2C5282",
                        "&:hover": {
                          background:
                            activeButton === "Files"
                              ? "#2c5282"
                              : "transparent",
                          color:
                            activeButton === "Files" ? "#F7FAFC" : "#2C5282",
                        },
                        ml: 3,
                      }}
                      className={styles.filter_img_btn}
                      onClick={() => handleButtonClick("Files")}
                    >
                      Files
                    </Button>
                    <Button
                      sx={{
                        background:
                          activeButton === "Audio" ? "#2c5282" : "transparent",
                        color: activeButton === "Audio" ? "#F7FAFC" : "#2C5282",
                        border: "1px solid #2C5282",
                        "&:hover": {
                          background:
                            activeButton === "Audio"
                              ? "#2c5282"
                              : "transparent",
                          color:
                            activeButton === "Audio" ? "#F7FAFC" : "#2C5282",
                        },
                        ml: 3,
                      }}
                      className={styles.filter_img_btn}
                      onClick={() => handleButtonClick("Audio")}
                    >
                      Audio
                    </Button>
                    <Button
                      sx={{
                        background:
                          activeButton === "Video" ? "#2c5282" : "transparent",
                        color: activeButton === "Video" ? "#F7FAFC" : "#2C5282",
                        border: "1px solid #2C5282",
                        "&:hover": {
                          background:
                            activeButton === "Video"
                              ? "#2c5282"
                              : "transparent",
                          color:
                            activeButton === "Video" ? "#F7FAFC" : "#2C5282",
                        },
                        ml: 3,
                      }}
                      className={styles.filter_img_btn}
                      onClick={() => handleButtonClick("Video")}
                    >
                      Video
                    </Button>
                  </TableCell>
                  <TableCell
                    sx={{ width: 0, visibility: "hidden" }}
                  ></TableCell>
                  <TableCell
                    sx={{ width: 0, visibility: "hidden" }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: "none" }}></TableCell>
                </TableRow>
                <TableRow sx={{ backgroundColor: "#F7FAFC" }}>
                  <TableCell sx={{ my: 2, height: 100, border: "none" }}>
                    <Image src={TablePhoto} alt="blog-img" />
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>
                    <Typography className={styles.blog_img_name}>
                      Oceanic_view.jpg
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ my: 2, border: "none" }}>
                    <Typography className={styles.blog_published_time}>
                      Uploaded 2 days ago
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ border: "none" }}></TableCell>
                  <TableCell sx={{ textAlign: "end", my: 2, border: "none" }}>
                    <IconButton>
                      <MoreHorizIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </main>
    </Layout>
  );
};
export default Files;
