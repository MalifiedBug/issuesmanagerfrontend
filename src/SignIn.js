import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MainContext } from "./App";

import Alert from "@mui/material/Alert";

import { serverUrl } from "./App";
import axios from "axios";
import { useContext } from "react";

export default function SignIn() {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [token, setToken] = useState("");
  const [name, setName] = useState("");

  const { admin, setAdmin, login, setLogin } = useContext(MainContext);

  console.log(token, login, admin, name);

  return (
    <div className="flex h-auto items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign In to your account
          </h2>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .required("Password is required")
              .min(5, "Your password is too short.")
              .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const { email, password } = values;
            setResponse(null);
            setTimeout(() => {
              //   alert(JSON.stringify({email:email,password:password}, null, 2));
              setSubmitting(false);
            }, 400);
            (async () => {
              const url = `${serverUrl}/signin`;
              const siginaxios = await axios
                .post(url, {
                  email,
                  password,
                })
                .then((response) => {
                  setResponse(response.data.msg);
                  setToken(response.data.token);
                  setName(response.data.name);
                  setAdmin(response.data.admin);
                  resetForm();
                  if (response.data.msg === "logged in") {
                    window.localStorage.setItem("token", response.data.token);
                    window.localStorage.setItem("user", response.data.name);
                    window.localStorage.setItem("admin", response.data.admin);
                    window.localStorage.setItem("login", "true");
                    setAdmin(response.data.admin.toString());
                    setLogin("true");
                    navigate("/user");
                  }
                })
                .catch((error) => alert(error, "error block activated"));
              console.log(siginaxios);
            })();
          }}
        >
          <Form method="POST" className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <Field
                  placeholder="Email"
                  className="relative block w-full rounded-t-md appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  name="email"
                  type="email"
                />
                <ErrorMessage sx={{ color: "red" }} name="email">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>
              <div>
                <Field
                  placeholder="Password"
                  className="relative block w-full rounded-b-md appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  name="password"
                  type="password"
                />
                <ErrorMessage sx={{ color: "red" }} name="password">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
            {response ? (
              <div>
                {response === "logged in" ? (
                  <Alert severity="success">{response}</Alert>
                ) : (
                  <div>
                    <Alert severity="error">{response}</Alert>
                    <a href="/">👉Create a new account now!!!👈</a>
                  </div>
                )}
              </div>
            ) : null}
            <div>
              {response === null ? (
                <div class="flex justify-center">
                  <div class="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 m-4 h-8 w-8"></div>
                </div>
              ) : null}
            </div>

            <div className="text-sm">
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                New Here! Sign Up!
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute font-bold inset-y-0 left-0 flex items-center pl-3"></span>
                Sign In
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
