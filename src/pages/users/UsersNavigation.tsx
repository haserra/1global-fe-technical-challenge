import React from "react";
import { NavLink } from "react-router-dom";
import { Box, MenuItem, MenuList } from "@mui/material";

const UsersNavigation: React.FC = () => {
  //const latestUserId = localStorage.getItem("latestUserId");

  return (
    <Box sx={{ display: "inline-block" }}>
      <MenuList
        sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
      >
        <MenuItem>
          <NavLink reloadDocument to={"/users"}>
            All Users
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to={"/users/new"}>New User</NavLink>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default UsersNavigation;
