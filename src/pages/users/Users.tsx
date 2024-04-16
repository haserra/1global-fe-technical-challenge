import React, { Suspense, useEffect, useState } from "react";
import { Await, Link, useLoaderData, useSearchParams } from "react-router-dom";
import { Box, Container, Pagination, Stack, Typography } from "@mui/material";

import { USERS_URL } from "../../services/api/constants";
import User from "./User";
import UsersNavigation from "./UsersNavigation";

const Users: React.FC = () => {
  const token = useLoaderData();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);
  const InitialPage = searchParams.get("page");

  const getUsers = async () => {
    const response = await fetch(`${USERS_URL}users?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUsers(data.data);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    getUsers();
  }, [page, totalPages]);

  // Example: https://codesandbox.io/p/sandbox/inspiring-wilbur-l3tsqk?file=%2Fsrc%2FDemo.tsx%3A8%2C9-8%2C21
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <UsersNavigation />
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        {/* <Await resolve={users}> */}
        <Container maxWidth="sm">
          {users.length &&
            users.map((user) => (
              <Link to={`/users/${user.id}`} key={user.id}>
                <User
                  //key={user.id}
                  name={user.first_name}
                  surname={user.last_name}
                  email={user.email}
                  avatar={user.avatar}
                />
              </Link>
            ))}
          {/* </Await> */}
        </Container>
      </Suspense>
      {users.length &&
        users.map((user, j) => console.log(`User ${j} is: `, user))}
      <Stack spacing={2}>
        <Box>
          <Typography>Click on a user to edit or delete it</Typography>
        </Box>
        <Typography>Page: {page}</Typography>
        <Box sx={{ alignItems: "center", justifyContent: "center" }}>
          <Pagination
            sx={{ display: "flex", justifyContent: "center" }}
            count={totalPages}
            page={page}
            shape="rounded"
            onChange={handleChange}
          />
        </Box>
      </Stack>
    </>
  );
};

export default Users;
