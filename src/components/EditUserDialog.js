import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import toasterContext from "../utils/context/tosterContext";
import axios from "axios";

const userRoles = [
  {
    id: 1,
    role: "Admin",
  },
  {
    id: 2,
    role: "Reader",
  },
  {
    id: 3,
    role: "Writer",
  },
];

function AddUser({ open, user, handleCloseEditDialog, handleApiRes }) {
  console.log("edit uuser ", user);
  React.useEffect(() => {
    setUserDetails(user);
  }, [user]);
  const [userDetails, setUserDetails] = React.useState({});
  const fireToasterContext = React.useContext(toasterContext);

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddUser = async () => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`,
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handleApiRes(response);
      if (response.status) {
        fireToasterContext.fireToasterHandler(
          true,
          "User created successfully"
        );
        handleCloseEditDialog();
      }
    } catch (error) {
      fireToasterContext.fireToasterHandler(
        false,
        error.response?.data?.message
      );
      handleCloseEditDialog();
    }
  };
  return (
    <>
      <div>
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={open}
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
            update user
            <IconButton
              onClick={handleCloseEditDialog}
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
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    fullWidth
                    placeholder="Enter user name"
                    variant="outlined"
                    name="name"
                    value={userDetails.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined-basic"
                    label="Email Address"
                    fullWidth
                    placeholder="Enter Email address"
                    variant="outlined"
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    fullWidth
                    placeholder="Enter your Phone Number"
                    variant="outlined"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleAddUser()}
              autoFocus
              sx={{
                backgroundColor: "#63B3ED",
                color: "white",
                width: "185px",
                height: "42px",
                "&:hover": {
                  boxShadow: 4,
                  backgroundColor: "#63B3ED",
                  color: "white",
                },
              }}
            >
              Update User Details
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default AddUser;
