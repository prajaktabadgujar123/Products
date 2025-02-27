import React from "react";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f1f1f1",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
  marginLeft: theme.spacing(2),
  width: "800px",
  maxWidth: "500px",
  display: "flex",
  alignItems: "center",
  padding: "4px 10px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  color: "#666",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#666",
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const NavBar = () => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ backgroundColor: "white", padding: "5px 8px" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
