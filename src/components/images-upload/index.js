/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Index() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [defaultImageIndex, setDefaultImageIndex] = useState();
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const imagesArray = localStorage.getItem("images");
    const defaultImage = parseInt(localStorage.getItem("defaultImage"));

    if (imagesArray) {
      setFiles(JSON.parse(imagesArray));
    }
    if (defaultImage) {
      setDefaultImageIndex(defaultImage);
    } else {
      setDefaultImageIndex(null);
    }
  }, []);

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

  const handleSelectDefault = (index) => {
    if (defaultImageIndex === index) {
      setDefaultImageIndex(null);
      localStorage.removeItem("defaultImage");
    } else {
      setDefaultImageIndex(index);
      localStorage.setItem("defaultImage", JSON.stringify(index));
    }
    handleMenuClose();
  };

  const handleRemoveImage = (id) => {
    const updatedFiles = files.filter((_, index) => index !== id);
    setFiles(updatedFiles);

    if (defaultImageIndex === id) {
      setDefaultImageIndex(null);
      localStorage.removeItem("defaultImage");
    } else if (defaultImageIndex > id) {
      setDefaultImageIndex(defaultImageIndex - 1);
      localStorage.setItem(
        "defaultImage",
        JSON.stringify(defaultImageIndex - 1)
      );
    }

    handleMenuClose();
  };

  const handleUploadButton = () => {
    if (defaultImageIndex === undefined) {
      alert("Please select a default image");
    } else {
      setLoading(true);
    }
  };

  const handleMenuClose = () => {
    setOpenMenuId(null);
  };

  const handleMenuOpen = (event, id) => {
    setOpenMenuId(id);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleChangeSelectImage,
    accept: "image/*",
  });

  return (
    <React.Fragment>
      <Box component={Container}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "40px",
                fontWeight: 700,
                color: "#040F25",
              }}
            >
              Welcome
            </Typography>
            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: 500,
                color: "#040F25",
              }}
              variant="headerBottomText"
            >
              Select venue images
            </Typography>
          </Box>

          <Button variant="contained" component="label" disabled={loading}>
            Select images
            <input multiple type="file" hidden {...getInputProps()} />
          </Button>
        </Box>
        <Box {...getRootProps()} style={{ marginTop: 16 }}>
          <input {...getInputProps()} />
          <Box
            sx={{
              border: "2px dashed #CCCCCC",
              borderRadius: "10px",
              padding: "16px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <Typography variant="body1">
              Drag and drop images here or click to select
            </Typography>
          </Box>
        </Box>
        <Card
          sx={{
            my: 2,
            display: files.length < 1 ? "none" : "block",
          }}
        >
          <CardContent
            sx={{
              height: 450,
              overflowY: "scroll",
              [`::-webkit-scrollbar`]: {
                width: 0,
                background: "transparent",
              },
            }}
          >
            <Grid container spacing={2}>
              {files.map((file, index) => (
                <Grid item key={index} xs={6} sm={4} md={2}>
                  <div
                    style={{
                      position: "relative",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <img
                        src={file.url}
                        alt={`Selected${file.name}`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "fill",
                          borderRadius: "10px",
                          border:
                            index === defaultImageIndex
                              ? "5px solid #DE2C34"
                              : "none",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                      }}
                    >
                      <IconButton
                        sx={{
                          color: "white",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
                          },
                        }}
                        onClick={(event) => handleMenuOpen(event, index)}
                      >
                        <MenuIcon />
                      </IconButton>
                    </div>
                  </div>
                  <Menu
                    open={openMenuId === index}
                    anchorEl={
                      openMenuId === index
                        ? document.getElementById(`menu-button-${index}`)
                        : null
                    }
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleSelectDefault(index)}>
                      Set as Default
                    </MenuItem>
                    <MenuItem onClick={() => handleRemoveImage(index)}>
                      Remove
                    </MenuItem>
                  </Menu>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Box
          sx={{
            display: files.length < 1 ? "none" : "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={handleUploadButton}
            disabled={loading}
          >
            {loading ? "Loading..." : "Save"}
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Index;
