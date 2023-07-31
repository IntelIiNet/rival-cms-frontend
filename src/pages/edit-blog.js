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

  const handlePublishBlog = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    let finalData = {
      data: {
        name: textAreaData,
        title: title,
      },
      status: "Published",
    };

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/${selectedBlog.blogId}`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);

      console.log("response", response);
      fireToasterContext.fireToasterHandler(true, "Blog Created Successfully");
      router.push("/view-site");
      localStorage.removeItem("title");
      localStorage.removeItem("blog");
    } catch (error) {
      fireToasterContext.fireToasterHandler(false, "Something went wrong");
    }
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
              disabled={!textAreaData}
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
          </CardActions>
        </Card>
        {/* ai dialog  */}
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={aiBlogDialog}
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
            Enter a prompt
            <IconButton
              onClick={() => setAiBlogDialog(false)}
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
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Prompt"
                    fullWidth
                    placeholder="Enter Prompt"
                    variant="outlined"
                    name="prompt"
                    onChange={(event) => setPromptTitle(event.target.value)}
                    InputProps={{
                      shrink: true,
                    }}
                    disabled={aiLoading}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleAiBlog()}
              autoFocus
              sx={{
                backgroundColor: "#63B3ED",
                color: "white",
                width: "135px",
                height: "42px",
                "&:hover": {
                  boxShadow: 4,
                  backgroundColor: "#63B3ED",
                  color: "white",
                },
              }}
            >
              {aiLoading ? "Loading..." : " Write AI Blogs"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};
export default MyComponent;
