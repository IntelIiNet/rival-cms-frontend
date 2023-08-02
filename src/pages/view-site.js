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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  MenuItem,
  Menu,
  InputBase,
} from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import styles from "@/styles/ViewSite.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import ToasterContext from "@/utils/context/tosterContext";
import { Search } from "@mui/icons-material";

const viewSite = () => {
  const router = useRouter();
  const [blogData, setBlogData] = useState();
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedBlog, setSelectedBlog] = useState();
  const fireToasterContext = useContext(ToasterContext);
  const [searchResult, setSearchResult] = useState("");

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
      let revedData = response.data.reverse();
      setBlogData(revedData);
      setLoading(false);
      console.log("publishing blog response", response.data);
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event, id) => {
    setSelectedBlog(id);
    setAnchorEl(event.currentTarget);
  };

  const handleStatusChange = async (status) => {
    console.log("selectedBlog", selectedBlog);
    const token = localStorage.getItem("token");
    setLoading(true);

    let finalData = {
      status: status,
    };

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/${selectedBlog}`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      getBlogs();
      console.log("response of status ", response);
      fireToasterContext.fireToasterHandler(
        true,
        "Status Changed Successfully"
      );
    } catch (error) {
      fireToasterContext.fireToasterHandler(false, "Something went wrong");
    }
  };

  const handleEditBlog = (blog) => {
    console.log("editt blog clicked", blog);
    localStorage.setItem("blog", JSON.stringify(blog.data.name));
    localStorage.setItem("title", JSON.stringify(blog.data.title));
    router.push({
      pathname: "/edit-blog",
      query: { blogId: blog.id },
    });
  };

  const handleRowClick = (blog) => {
    console.log("data of row", blog);
    localStorage.setItem("blog", JSON.stringify(blog.data.name));
    localStorage.setItem("title", JSON.stringify(blog.data.title));
    router.push("/view-blog");
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

  const handleSearch = (event) => {
    setSearchResult(event.target.value);
  };
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
          <Box sx={{ mb: 2 }}>
            <InputBase
              onChange={(event) => handleSearch(event)}
              sx={{
                width: "100%",
                height: "48px",
                borderRadius: 2,
                backgroundColor: "#EDF2F7",
              }}
              placeholder={"Search Blog"}
              inputProps={{ "aria-label": "search" }}
              startAdornment={
                <Search
                  sx={{
                    color: "rgba(151, 151, 151, 0.68);",
                    marginLeft: "6px",
                  }}
                />
              }
            />
          </Box>
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
                  blogData
                    .filter((u) => {
                      const searchValue = searchResult?.toLowerCase() || "";
                      const titleMatch = u?.data.title
                        .toLowerCase()
                        .includes(searchValue);

                      return titleMatch;
                    })
                    .map((blog) => (
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
                            <Typography
                              className={styles.card_sub_heading_typo}
                            >
                              {formatDateToDisplay(blog.createdAt)}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ my: 2, border: "none" }}>
                            <Button
                              disableRipple
                              variant="outlined"
                              onClick={(e) => handleMenuClick(e, blog.id)}
                              sx={{
                                borderRadius: "10px",
                                width: 100,
                                textTransform: "capitalize",
                              }}
                            >
                              <Typography>{blog?.status}</Typography>
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
                            <Box sx={{ display: "flex" }}>
                              <IconButton
                                onClick={() => handleEditBlog(blog)}
                                sx={{
                                  backgroundColor: "primary.main",
                                  "&.hover": {
                                    backgroundColor: "primary.main",
                                    boxShadow: 2,
                                  },
                                }}
                              >
                                <ModeEditOutlineOutlinedIcon
                                  fontSize="small"
                                  sx={{ color: "white" }}
                                />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDeletBlog(blog)}
                                sx={{
                                  backgroundColor: "#8B0000",
                                  ml: 2,
                                  "&.hover": {
                                    backgroundColor: "#8B0000",
                                    boxShadow: 2,
                                  },
                                }}
                              >
                                <DeleteOutlineOutlinedIcon
                                  fontSize="small"
                                  sx={{
                                    color: "white",
                                  }}
                                />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          // disableScrollLock={true}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          transformOrigin={{
            horizontal: "left",
            vertical: "top",
          }}
          anchorOrigin={{
            horizontal: "left",
            vertical: "bottom",
          }}
        >
          <MenuItem onClick={() => handleStatusChange("Published")}>
            <Typography>Publish</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange("Draft")}>
            <Typography>Save as a draft</Typography>
          </MenuItem>
        </Menu>
      </main>
    </Layout>
  );
};
export default viewSite;
