import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IUserProps {
  id?: string;
  name: string;
  surname: string;
  email: string;
  avatar: string;
}

const User: React.FC<IUserProps> = ({ name, surname, email, avatar }) => {
  const navigate = useNavigate();

  // example
  const routeChange = () => {
    const path = `newPath`;
    navigate(path);
  };

  return (
    <Box
      display="flex"
      justifyContent=""
      sx={{
        p: 2,
        m: 1,
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 1,
        //bgcolor: "primary.main"
        //bgcolor: "#f1f8e9",
        "&:hover": {
          //bgcolor: "#e91e63",
          bgcolor: "primary.dark",
        },
      }}
    >
      <Box>
        <img src={avatar} />
      </Box>
      <Box sx={{ p: 2 }}>
        <Container>
          <Box>
            <Typography>
              {name} {surname}
            </Typography>
          </Box>
        </Container>
        <Box>{email}</Box>
      </Box>
    </Box>
  );
};

export default User;
