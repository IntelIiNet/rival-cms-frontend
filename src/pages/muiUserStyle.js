import { Dialog, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";

export const userHeading = {
  "&.MuiTypography-userHeadingBoldButton": {
    color: "white",
    // fontFamily: "Poppins-SemiBold",
    fontSize: "15px",
    textTransform: "capitalize",
  },
  "&.MuiTypography-userTableHeadingBold": {
    color: "white",
    // fontFamily: "Poppins-SemiBold",
    fontSize: "20px",
    textTransform: "capitalize",
  },
  "&.MuiTypography-userTableCellName": {
    color: "primary.tableFontColor",
    // fontFamily: "Poppins",
    fontSize: "15px",
    textTransform: "capitalize",
  },
  "&.MuiTypography-userRoleTableCellName": {
    textTransform: "capitalize",
    height: "20px",
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  // getContentAnchorEl: null,
  lable: {
    color: "red",
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

export const textfield = {
  input: {
    color: "primary.fontColor",
    // background: "#FFFFFF",
    fontFamily: "Poppins",
  },
  label: {
    color: "primary.fontColor",
    // background: "#FFFFFF",
    fontFamily: "Poppins",
  },
  "& .MuiOutlinedInput-root": {
    marginBottom: "10px",
    color: "primary.fontColor",
    "& fieldset": {
      fontFamily: "Poppins",
      borderColor: "#EDEDED",
      borderRadius: 3,
    },
    "& label": {
      // fontFamily: "Poppins",
      // borderColor: "#EDEDED",
    },
    "&:hover fieldset": {
      borderColor: "#7D8EA3",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#7D8EA3",
    },
  },
};

export const styledSelectField = {
  borderRadius: 3,
  color: "#9B9B9B",
  textAlign: "left",
  ".MuiSvgIcon-root ": {
    fill: "#9B9B9B",
  },
  ":before": {
    borderBottomColor: "#9B9B9B",
    opacity: "48%",
  },
  ":after": {
    borderBottomColor: "#9B9B9B",
    opacity: "48%",
  },
  "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
    borderBottom: `2px solid #9B9B9B`,
    opacity: "48%",
  },
};
export const userTypographies = {
  "&.MuiTypography-inputOutputListHeading": {
    color: "black",
    fontFamily: "Poppins-SemiBold",
    fontSize: "15px",
    // lineHeight: "37.5px",
    textTransform: "capitalize",
  },
  "&.MuiTypography-inputOutputList": {
    display: "flex",
    flexDirection: "column",
    color: "primary.fontColor",
    fontFamily: "Poppins",
    fontSize: "15px",
    textTransform: "capitalize",
  },
};

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, backgroundColor: "background.bgLayoutA" }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export const tableLoaderBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
