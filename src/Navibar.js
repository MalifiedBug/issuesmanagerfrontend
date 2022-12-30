import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MainContext } from "./App";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { IconButton } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const { admin, setAdmin, login, setLogin } = useContext(MainContext);

  console.log(typeof admin, typeof login);

  const loggedout = () =>
    toast.success("Logged Out!", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover:false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="flex flex-row justify-between">
          <IconButton color="inherit" onClick={() => navigate("/")}>
            <AccountTreeIcon /> &nbsp; HelpDesk
          </IconButton>
          {login === "true" ? (
            <div>
              <Button
                onClick={() => {
                  navigate("/queryform");
                }}
                color="inherit"
              >
                Submit Issue
              </Button>
              {admin === "true" ? (
                <Button
                  onClick={() => {
                    navigate("/admin");
                  }}
                  color="inherit"
                >
                  Admin
                </Button>
              ) : null}
              {admin === "true" ? (
                <Button
                  onClick={() => {
                    navigate("/permissions");
                  }}
                  color="inherit"
                >
                  Permissions
                </Button>
              ) : null}
              <Button
                onClick={() => {
                  navigate("/user");
                }}
                color="inherit"
              >
                Queries
              </Button>
            </div>
          ) : null}
          {login !== "true" ? (
            <div>
              <Button
                onClick={() => {               
                  navigate("/pricing");
                }}
                color="inherit"
              >
                Pricing
              </Button>
              <Button
                onClick={() => {               
                  navigate("/signin");
                }}
                color="inherit"
              >
                SignIn
              </Button>
              <Button
                onClick={() => {                 
                  navigate("/signup");
                }}
                color="inherit"
              >
                SignUp
              </Button>
            </div>
          ) : null}
          {login === "true" ? (
            <Button
              onClick={() => {
                loggedout();
                window.localStorage.setItem("login", false);
                window.localStorage.setItem("admin", false);
                window.localStorage.setItem("token", null);
                window.localStorage.setItem("user", null);
                setAdmin(false);
                setLogin(false);
                navigate("/");
              }}
              color="inherit"
            >
              Log Out
            </Button>
          ) : null}
          {/* log out toast */}
        </Toolbar>
      </AppBar>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </Box>
  );
}
