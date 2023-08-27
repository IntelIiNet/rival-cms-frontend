import React, { useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import ToasterContext from "@/utils/context/tosterContext";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
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
  const fireToasterContext = useContext(ToasterContext);
  const [loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [aiBlogDialog, setAiBlogDialog] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [title, setTitle] = useState();
  const [textAreaData, setTextAreaData] = useState();
  const [promptTitle, setPromptTitle] = useState();
  const [permission, setPermission] = useState({});

  console.log("permission", permission);
  useEffect(() => {
    const permission = JSON.parse(localStorage.getItem("user_permission"));
    setPermission(permission);
  }, []);
  const handleChange = (content) => {
    // Handle the editor content here
    console.log("content", content);
    setTextAreaData(content);
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

    console.log(
      "newTextAreaData before the api call",
      finalData.data.newTextAreaData
    );

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/blog`,
      finalData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("response after api call", response);
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

  function dataURLToBlob(dataURL) {
    const parts = dataURL.split(";base64,");
    const byteString = atob(parts[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const mimeString = parts[0].split(":")[1];
    return new Blob([arrayBuffer], { type: mimeString });
  }
  const handleSaveAsADraftBlog = (status) => {
    handlePublishBlog(status);
  };

  const handleAiBlog = async () => {
    const token = localStorage.getItem("token");
    setAiLoading(true);
    let finalPrompt = {
      prompt: promptTitle,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/openai-blog`,
        finalPrompt,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAiLoading(false);
      setAiBlogDialog(false);
      let promptResponse = response?.data[0]?.message?.content;

      localStorage.setItem("promptResponse", promptResponse);

      let cleanedResponse = promptResponse.replace(/[\n\r\t]/g, "");
      let finalResponse = JSON.parse(cleanedResponse);
      console.log("finalResponse", finalResponse);

      let formattedText = finalResponse.data.replace(/\/\/n/g, "<br/>");

      setTitle(finalResponse.title);
      setTextAreaData(formattedText);
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <div>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  paddingLeft: "50px",
                  fontSize: "40px",
                  fontWeight: "bold",
                  pt: 2,
                  pb: 0,
                  textAlign: "center",
                  mb: 1,
                  mr: "122px",
                }}
              >
                Write Blog Here
              </Typography>
            </Box>
            <Box sx={{ marginLeft: "auto" }}>
              <Button
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
                onClick={() => setAiBlogDialog(true)}
              >
                Write AI Blog
              </Button>
            </Box>
          </Box>
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
              InputLabelProps={{
                shrink: "true",
              }}
            />
          </Box>
          <SunEditor
            onChange={handleChange}
            value={textAreaData}
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
              visibility:
                permission.user_role === "Reader" ||
                permission.user_role === "Writer"
                  ? "hidden"
                  : "visible",
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
              visibility:
                permission.user_role === "Reader" ||
                permission.user_role === "Writer"
                  ? "hidden"
                  : "visible",
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
    </div>
  );
};
export default MyComponent;
