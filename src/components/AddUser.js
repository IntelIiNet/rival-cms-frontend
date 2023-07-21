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

function AddUser({ open, handleCloseEditDialog }) {
  const [userDetails, setUserDetails] = React.useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    user_role: "",
  });
  const fireToasterContext = React.useContext(toasterContext);
  console.log("userDetails", userDetails);
  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddUser = async () => {
    try {
      let token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/createSubUsers`,
        userDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status) {
        fireToasterContext.fireToasterHandler(
          true,
          "User created successfully"
        );
      }
    } catch (error) {
      fireToasterContext.fireToasterHandler(
        false,
        error.response?.data?.message
      );
    }

    console.log("response", response);
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
            Enter New user Details
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
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select User Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select User Role"
                      name="user_role"
                      onChange={handleChange}
                    >
                      {userRoles.map((option) => (
                        <MenuItem key={option.id} value={option.role}>
                          {option.role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    fullWidth
                    placeholder="Enter password"
                    variant="outlined"
                    name="password"
                    type="password"
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
                width: "135px",
                height: "42px",
                "&:hover": {
                  boxShadow: 4,
                  backgroundColor: "#63B3ED",
                  color: "white",
                },
              }}
            >
              Add New User
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default AddUser;
