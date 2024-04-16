import React, { useEffect, useState } from "react";
import { Form, Link, useActionData, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";

const AuthForm: React.FC = () => {
  const data = useActionData();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);

  const isLogin = searchParams.get("mode") === "login";

  useEffect(() => {
    if (data && data.error) {
      setError(true);
    }
  }, [data]);

  return (
    <Container>
      <Box sx={{ width: 800 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          {isLogin ? "Login with your email and password" : "Please Register"}
        </Typography>
      </Box>
      <Box>
        <Form method="post">
          <Box display={"grid"}>
            <FormControl>
              <TextField
                error={error}
                label="Email"
                required
                variant="outlined"
                color="secondary"
                type="email"
                name="email"
                sx={{ mb: 3 }}
                fullWidth
                //helperText={error ? "Please provide Email" : ""}
              />
            </FormControl>
            <FormControl>
              <TextField
                error={error}
                label="Password"
                required
                variant="outlined"
                color="secondary"
                type="password"
                name="password"
                sx={{ mb: 3 }}
                fullWidth
                //helperText={error ? "Please provide a valid Password" : ""}
              />
            </FormControl>
            {!isLogin && (
              <FormControl>
                <TextField
                  error={error}
                  label="Repeat password"
                  required
                  variant="outlined"
                  color="secondary"
                  type="password"
                  name="confirmPassword"
                  sx={{ mb: 3 }}
                  fullWidth
                  //helperText={error ? "Please provide a valid Password" : ""}
                />
              </FormControl>
            )}
            {data && data.error && (
              <Typography sx={{ mb: 2 }}>{data.error}</Typography>
            )}
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="secondary" type="submit">
              {isLogin ? "Login " : "Register"}
            </Button>
          </Box>
          <Box>
            <Typography variant="h6" component="h2" sx={{ mb: 2, mt: 5 }}>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
                {isLogin ? "Register" : "Login"}
              </Link>
            </Typography>
          </Box>
        </Form>
      </Box>
    </Container>
  );
};

export default AuthForm;
