import React, { useEffect, useState } from "react";
import { Layout } from "@/layouts/dashboard/layout";
import Head from "next/head";
import Container from "@mui/material/Container";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

const PreviewBlog = () => {
  const router = useRouter();
  const [getBlog, setBlog] = useState();
  const [getTitle, setTitle] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBlog(JSON.parse(localStorage.getItem("blog")));
    setTitle(JSON.parse(localStorage.getItem("title")));
  }, []);

  const createMarkup = (html) => {
    return { __html: html };
  };

  const handlePublishBlog = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    let finalData = {
      data: {
        name: getBlog,
      },
      status: "Published",
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/blog`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      fireToasterContext.fireToasterHandler(true, "Blog Created Successfully");
      router.push("/view-site");
      localStorage.removeItem("title");
      localStorage.removeItem("blog");

      console.log("publishing blog response", response.data);
    } catch (error) {
      console.error("Error publishing blog:", error);
      fireToasterContext.fireToasterHandler(false, "Something went wrong");
    }
  };

  return (
    <Layout>
      <Head>
        <title>Blog preview</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ height: "90vh" }}>
        <Container maxWidth="md" sx={{ mt: "110px" }}>
          <Box sx={{ mb: 3 }}>
            <Button
              onClick={() => router.push("/write-blog")}
              sx={{
                backgroundColor: "#40c1b9",
                color: "white",
                width: "135px",
                height: "42px",
                mr: 5,

                "&:hover": {
                  boxShadow: 4,
                  backgroundColor: "#40c1b9",
                  color: "white",
                },
              }}
            >
              Edit
            </Button>
            <Button
              onClick={handlePublishBlog}
              sx={{
                backgroundColor: "#40c1b9",
                color: "white",
                width: "135px",
                height: "42px",
                "&:hover": {
                  boxShadow: 4,
                  backgroundColor: "#40c1b9",
                  color: "white",
                },
              }}
            >
              {loading ? "Loading..." : "Publish"}
            </Button>
          </Box>
          <h1>{getTitle}</h1>
          {/* Render the HTML content safely */}
          <div dangerouslySetInnerHTML={createMarkup(getBlog)} />
        </Container>
      </main>
    </Layout>
  );
};

export default PreviewBlog;
