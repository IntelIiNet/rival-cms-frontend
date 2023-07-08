import NextLink from "next/link";
import PropTypes from "prop-types";
import { Box, ButtonBase } from "@mui/material";

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title } = props;

  const linkProps = path
    ? external
      ? {
          component: "a",
          href: path,
          target: "_blank",
        }
      : {
          component: NextLink,
          href: path,
        }
    : {};

  return (
    <>
      <li>
        <ButtonBase
          sx={{
            alignItems: "center",
            borderRadius: 1,
            display: "flex",
            justifyContent: "flex-start",
            pl: "16px",
            pr: "16px",
            py: "6px",
            textAlign: "left",
            width: "100%",
            color: "#2C5282",
            ...(active && {
              color: "#2C5282",
              backgroundColor: "#BEE3F8",
            }),
            "&:hover": {
              backgroundColor: "#63B3ED",
              color: "white",
            },
          }}
          {...linkProps}
        >
          {icon && (
            <Box
              component="span"
              sx={{
                alignItems: "center",
                color: "#2C5282",
                display: "inline-flex",
                justifyContent: "center",
                mr: 2,
                ...(active && {
                  color: "primary.main",
                }),
              }}
            >
              {icon}
            </Box>
          )}
          <Box
            component="span"
            sx={{
              flexGrow: 1,
              color: "#2C5282",
              fontSize: 18,
              fontWeight: 300,
              lineHeight: "24px",
              whiteSpace: "nowrap",
              ...(active && {
                color: "#2C5282",
                fontWeight: 600,
              }),
              ...(disabled && {
                color: "neutral.500",
              }),
            }}
          >
            {title}
          </Box>
        </ButtonBase>
      </li>
    </>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};
