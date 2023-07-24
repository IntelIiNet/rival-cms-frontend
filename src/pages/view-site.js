/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../layouts/dashboard/layout";
import Head from "next/head";
import {
  Button,
  Container,
  SvgIcon,
  Typography,
  Box,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ListItemIcon,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "@/styles/ViewSite.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import ToasterContext from "@/utils/context/tosterContext";

const viewSite = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const fireToasterContext = useContext(ToasterContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getBlogs = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blog`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogData(response.data);
      setLoading(false);
      console.log("publishing blog response", response.data);
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleEditBlog = (blog) => {
    localStorage.setItem("blog", JSON.stringify(blog.data.name));
    localStorage.setItem("title", JSON.stringify(blog.data.title));
    router.push({
      pathname: "/edit-blog",
      query: { data: JSON.stringify(blog.id) },
    });
  };

  const handleDeletBlog = async (blog) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/${blog.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("deelte response", response);
      getBlogs();
      fireToasterContext.fireToasterHandler(true, "Blog Deleted Successfully");
    } catch (error) {
      fireToasterContext.fireToasterHandler(
        false,
        error?.response?.data?.message
      );
      console.error("Error delete blog:", error);
    }
  };

  const handleRowClick = (blog) => {
    console.log("data of row", blog);
    localStorage.setItem("blog", JSON.stringify(blog.data.name));
    localStorage.setItem("title", JSON.stringify(blog.data.title));
    router.push("/view-blog");
  };

  function formatDateToDisplay(timestamp) {
    const date = new Date(timestamp);

    // Extract date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Extract time components
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Determine whether it's AM or PM
    const amOrPm = hours >= 12 ? "pm" : "am";

    // Adjust the hours to 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // Construct the final formatted string
    const formattedDate = `Posted on ${year}-${month}-${day} ${formattedHours}:${minutes} ${amOrPm}`;

    return formattedDate;
  }

  console.log("blog post", blogData);
  return (
    <Layout>
      <Head>
        <title>view site</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container sx={{ mt: "108px" }}>
          <TableContainer sx={{ maxHeight: 620 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography className={styles.typo}>Title</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={styles.typo}>Status</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={styles.typo}>Stats</Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: "end" }}>
                    <Button
                      onClick={() => router.push("/write-blog")}
                      variant="contained"
                      className={styles.btnText}
                      sx={{
                        backgroundColor: "#40c1b9",
                        color: "white",
                      }}
                      startIcon={
                        <SvgIcon fontSize="small">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M10 15.8333L15.8333 10L18.3333 12.5L12.5 18.3333L10 15.8333Z"
                              stroke="#FFFCFE"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M15 10.8334L13.75 4.58335L1.66666 1.66669L4.58332 13.75L10.8333 15L15 10.8334Z"
                              stroke="#FFFCFE"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M1.66666 1.66669L7.98832 7.98835"
                              stroke="#FFFCFE"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M9.16667 10.8333C10.0871 10.8333 10.8333 10.0871 10.8333 9.16667C10.8333 8.24619 10.0871 7.5 9.16667 7.5C8.24619 7.5 7.5 8.24619 7.5 9.16667C7.5 10.0871 8.24619 10.8333 9.16667 10.8333Z"
                              stroke="#FFFCFE"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </SvgIcon>
                      }
                    >
                      Add New
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>Loading...</TableCell>
                    <TableCell></TableCell>
                  </>
                ) : (
                  blogData &&
                  blogData.map((blog) => (
                    <>
                      <TableRow>
                        <TableCell sx={{ border: "none" }}></TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          backgroundColor: "#F7FAFC",
                        }}
                      >
                        <TableCell
                          sx={{
                            my: 2,
                            height: 100,
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => handleRowClick(blog)}
                        >
                          <Typography className={styles.card_heading_typo}>
                            {blog.data.title}
                          </Typography>
                          <Typography className={styles.card_sub_heading_typo}>
                            {formatDateToDisplay(blog.createdAt)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ my: 2, border: "none" }}>
                          <Button className={styles.card_btn}>
                            {blog.status}
                          </Button>
                        </TableCell>
                        <TableCell sx={{ my: 2, border: "none" }}>
                          {/* stats wrapper */}
                          <Box className={styles.stats_wrapper}>
                            <Typography className={styles.stats}>
                              120
                            </Typography>
                            <Typography className={styles.stats_views}>
                              views
                            </Typography>
                            <SvgIcon>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                  stroke="#9AE6B4"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M16 12L12 8L8 12"
                                  stroke="#9AE6B4"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M12 16V8"
                                  stroke="#9AE6B4"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </SvgIcon>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                          >
                            <IconButton
                              onClick={handleClick}
                              size="small"
                              sx={{ justifyContent: "flex-end" }}
                              aria-controls={
                                Boolean(anchorEl) ? "account-menu" : undefined
                              }
                              aria-haspopup="true"
                              aria-expanded={
                                Boolean(anchorEl) ? "true" : undefined
                              }
                            >
                              <MoreHorizIcon />
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
                                  filter:
                                    "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
                              transformOrigin={{
                                horizontal: "right",
                                vertical: "top",
                              }}
                              anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom",
                              }}
                            >
                              <MenuItem onClick={() => handleEditBlog(blog)}>
                                <ListItemIcon>
                                  <ModeEditOutlineOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                Edit Blog
                              </MenuItem>
                              <MenuItem onClick={() => handleDeletBlog(blog)}>
                                <ListItemIcon>
                                  <DeleteOutlineOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                Delete
                              </MenuItem>
                            </Menu>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    </>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </main>
    </Layout>
  );
};
export default viewSite;
