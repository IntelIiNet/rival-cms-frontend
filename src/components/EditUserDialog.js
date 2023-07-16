import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
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

function UpdateUser({ open, user, handleCloseEditDialog }) {
  const [userRole, setUserRole] = React.useState("");

  const handleChange = (event) => {
    setUserRole(event.target.value);
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
            Update user Details
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
                <Grid item xs={12}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    fullWidth
                    placeholder="Enter user name"
                    variant="outlined"
                    name="userName"
                    value={user.title}
                    InputProps={{
                      shrink: true,
                    }}
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
                      value={userRole}
                      label="Select User Role"
                      onChange={handleChange}
                    >
                      <MenuItem>Admin</MenuItem>
                      <MenuItem>Writer</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => !open}
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
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default UpdateUser;
