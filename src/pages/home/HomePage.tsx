import React, { Suspense, useEffect, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { USERS_URL } from "../../services/api/constants";
import { Box, Typography } from "@mui/material";
import UsersNavigation from "../users/UsersNavigation";

const HomePage: React.FC = () => {
  const token = useLoaderData();
  const [user, setUser] = useState();

  // example
  const getUser = async () => {
    const res = await fetch(USERS_URL + "users/2", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Box sx={{ width: 800, p: 5 }}>
        <UsersNavigation />
      </Box>
      <Box>
        <Suspense>
          <Await resolve={user}>
            {(user) => (
              <Typography variant="h4" component="h1">
                Hello {user && user.data.first_name} !
              </Typography>
            )}
          </Await>
        </Suspense>
      </Box>
    </>
  );
};

export default HomePage;
