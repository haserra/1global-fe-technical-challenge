import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { action as authAction, getAuthToken } from "./utils/authentication";
import { action as userAction } from "./utils/users";
import { tokenLoader } from "./utils/authentication";
import HomePage from "./pages/home/HomePage";
import Authentication from "./pages/authentication/Authentication";
import Users from "./pages/users/Users";
import EditUser from "./pages/users/EditUser";
import NewUser from "./pages/users/NewUser";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    id: "home",
    loader: tokenLoader,
  },
  {
    path: "auth",
    element: <Authentication />,
    action: authAction,
    id: "auth",
  },
  {
    path: "users",
    element: <Users />,
    id: "users",
    //loader: usersLoader
    loader: tokenLoader,
    /* children: [
      {
        //index: true,
        path: ":userId",
        element: <EditUser />,
        id: "editUser",
        loader: tokenLoader,
      },
    ], */
  },
  {
    path: "users/:userId",
    element: <EditUser />,
    action: userAction,
    id: "editUser",
    loader: tokenLoader,
    //loader: userDetailsLoader,
  },
  {
    path: "users/new",
    element: <NewUser />,
    action: userAction,
    id: "newUser",
    loader: tokenLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
