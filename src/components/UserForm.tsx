import React, { useEffect, useState } from "react";
import {
  Form,
  useLoaderData,
  useLocation,
  useParams,
  useSubmit,
} from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { getUser } from "../utils/users";

interface IUserFormProps {
  mode: "edit" | "create";
}

const UserForm: React.FC<IUserFormProps> = ({ mode }) => {
  const token = useLoaderData();
  const { userId } = useParams();
  const location = useLocation();
  //const { pending, data, method, action } = useFormStatus(); // future
  const [method, setMethod] = useState<HTMLFormMethod>("PUT");
  const [user, setUser] = useState({});
  const submit = useSubmit();

  const isEditing: boolean = mode === "edit";
  const isCreating: boolean = mode === "create";

  const getUserData = async () => {
    const user = await getUser(userId, token);
    setUser(user);
  };

  const handleUpdateUser = () => {
    setMethod("PUT");
    submit(null, { method: "PUT" });
  };

  const handleCreateUser = () => {
    setMethod("POST");
    submit(null, { method: "POST" });
  };

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  }

  const formIsValid = () => {
    if (
      user.first_name === "" ||
      user.first_name === undefined ||
      user.last_name === "" ||
      user.last_name === undefined ||
      user.email === "" ||
      user.email === undefined
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (mode === "edit") {
      getUserData();
    }
  }, []);

  return (
    <Container>
      <Box sx={{ width: 800, p: 2 }}>
        <Typography variant="h4">
          {isEditing && `Edit User ${user.first_name}`}
          {isCreating && `Create User`}
        </Typography>
      </Box>
      <Box>
        <Form method={method}>
          <Box display={"grid"}>
            <FormControl>
              <TextField
                id="outlined-basic"
                label={isCreating && "Name"}
                variant="outlined"
                name="name"
                value={user.first_name}
                onChange={(e) =>
                  setUser({ ...user, first_name: e.target.value })
                }
                sx={{ mb: 3 }}
                //inputProps={{ value: user.first_name }}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="outlined-basic"
                label={isCreating && "Surname"}
                variant="outlined"
                name="surname"
                value={user.last_name}
                onChange={(e) =>
                  setUser({ ...user, last_name: e.target.value })
                }
                sx={{ mb: 3 }}
              />
            </FormControl>
            <FormControl>
              <TextField
                id="outlined-basic"
                label={isCreating && "Email"}
                variant="outlined"
                name="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                sx={{ mb: 3 }}
              />
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            {isEditing && (
              <>
                <Box sx={{ pr: 2 }}>
                  <Button
                    onClick={handleUpdateUser}
                    variant="outlined"
                    color="secondary"
                    type="submit"
                    disabled={!formIsValid()}
                  >
                    Update
                  </Button>
                </Box>
                <Box>
                  <Button
                    onClick={startDeleteHandler}
                    variant="outlined"
                    color="secondary"
                    disabled={!formIsValid()}
                  >
                    Delete
                  </Button>
                </Box>
              </>
            )}
            {isCreating && (
              <>
                <Box>
                  <Button
                    onClick={handleCreateUser}
                    variant="outlined"
                    color="secondary"
                    type="submit"
                    disabled={!formIsValid()}
                  >
                    Create
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Form>
      </Box>
    </Container>
  );
};

export default UserForm;
