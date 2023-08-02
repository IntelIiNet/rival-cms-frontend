/* eslint-disable react-hooks/rules-of-hooks */

import React, { useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import ToasterContext from "@/utils/context/tosterContext";
import { Layout } from "../layouts/dashboard/layout";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useRouter } from "next/router";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const MyComponent = () => {
  const router = useRouter();
  const selectedBlog = router.query; // Parse the "data" query parameter
  console.log("selectedBlog", selectedBlog);
  const [textAreaData, setTextAreaData] = useState();
  const fireToasterContext = useContext(ToasterContext);
  const [loading, setLoading] = useState(false);
  const [aiBlogDialog, setAiBlogDialog] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [title, setTitle] = useState("");

  //   // Check if blog and title exist in local storage
  useEffect(() => {
    const storedBlog = JSON.parse(localStorage.getItem("blog"));
    const storedTitle = JSON.parse(localStorage.getItem("title"));
    if (storedBlog && storedTitle) {
      setTextAreaData(storedBlog);
      setTitle(storedTitle);
    }
  }, []);

  const handleBackButton = () => {
    router.push("/view-site");
    localStorage.removeItem("blog");
    localStorage.removeItem("title");
  };

  const handleChange = (content) => {
    // Handle the editor content here
    setTextAreaData(content);
  };
  const handleSaveAsADraftBlog = (status) => {
    handlePublishBlog(status);
  };

  const handlePublishBlog = async (status) => {
    const token = localStorage.getItem("token");
    if (status === "Draft") {
      setDraftLoading(true);
    } else {
      setLoading(true);
    }

    // Create a DOM parser to parse your HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(textAreaData, "text/html");

    // Get all the image elements
    const images = doc.querySelectorAll("img");
    for (let img of images) {
      // Only process data URLs
      if (img.src.startsWith("data:")) {
        const blob = dataURLToBlob(img.src);
        const formData = new FormData();
        formData.append("file", blob);
        // Assuming your server has an /upload endpoint that handles file upload
        // and responds with the URL of the uploaded file
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/image-upload/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("response of image", res);
        // Replace the data URL with the actual URL
        img.src = res.data.url;
      }
    }

    // Serialize back to HTML
    const newTextAreaData = doc.body.innerHTML;

    let finalData = {
      data: {
        name: newTextAreaData,
        title: title,
      },
      status: status,
    };

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
    fireToasterContext.fireToasterHandler(
      true,
      status === "Darft" ? "Saved as a Draft" : "Blog Created Successfully"
    );
    router.push("/view-site");
    localStorage.removeItem("title");
    localStorage.removeItem("blog");

    console.log("publishing blog response", response.data);
  };

  return (
    <Layout>
      <Container sx={{ mt: "110px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={() => handleBackButton()}
            sx={{
              backgroundColor: "#40c1b9",
              color: "white",
              width: "135px",
              height: "42px",
              mr: 5,
              mb: 3,

              "&:hover": {
                boxShadow: 4,
                backgroundColor: "#40c1b9",
                color: "white",
              },
            }}
          >
            Back
          </Button>
        </Box>
        <Card>
          <CardContent>
            <Box sx={{ my: 2 }}>
              <TextField
                fullWidth
                placeholder="Add Title"
                label="Blog Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                sx={{
                  fontFamily: "Poppins",
                }}
              />
            </Box>
            <SunEditor
              onChange={handleChange}
              setContents={textAreaData}
              setOptions={{
                font: [
                  "Arial",
                  "Poppins",
                  "Roboto",
                  "verdana",
                  "Futura",
                  "HeroNew",
                  "tohoma",
                  "Courier New,Courier",
                ],
                buttonList: [
                  ["undo", "redo"],
                  [
                    "font",
                    "fontSize",
                    "formatBlock",
                    "paragraphStyle",
                    "blockquote",
                    "bold",
                    "underline",
                    "italic",
                    "strike",
                    "subscript",
                    "superscript",
                  ],
                  ["fontColor", "hiliteColor", "removeFormat"],
                  [
                    "align",
                    "horizontalRule",
                    "outdent",
                    "indent",
                    "list",
                    "table",
                  ],
                  ["image", "video", "link"],
                  ["fullScreen", "codeView", "preview", "print"],
                ],
                defaultFont: "Poppins, sans-serif",
                defaultFontSize: "16px",

                // Set the default font for the editor's content area
                fontSize: [
                  "8",
                  "10",
                  "12",
                  "14",
                  "16",
                  "18",
                  "20",
                  "24",
                  "28",
                  "36",
                  "48",
                  "72",
                ],
                imageFileInput: true,
                videoFileInput: true,
              }}
              height="400px"
            />
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}
          >
            <Button
              onClick={() => handlePublishBlog("Publish")}
              disabled={!textAreaData || !title}
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
            <Typography
              sx={{
                mx: 1,
                ml: 2,
              }}
            >
              OR
            </Typography>
            <Button
              onClick={() => handleSaveAsADraftBlog("Draft")}
              disabled={!textAreaData}
              sx={{
                backgroundColor: "#40c1b9",
                color: "white",
                width: "155px",
                height: "42px",
                "&:hover": {
                  boxShadow: 4,
                  backgroundColor: "#40c1b9",
                  color: "white",
                },
              }}
            >
              {draftLoading ? "Loading..." : "Save as a Draft"}
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Layout>
  );
};
export default MyComponent;
