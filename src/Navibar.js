import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MainContext } from "./App";

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const { admin, setAdmin, login, setLogin } = useContext(MainContext);

  console.log(typeof admin, typeof login);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="flex flex-row justify-between">
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
              <Button
                onClick={() => {
                  navigate("/user");
                }}
                color="inherit"
              >
                User
              </Button>
            </div>
          ) : null}
          {login !== "true" ? (
            <div>
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
