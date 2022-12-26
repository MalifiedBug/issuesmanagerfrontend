import "./App.css";
import QueryForm from "./QueryForm";
import AdminQueries from "./AdminQueries";
import UserQueries from "./UserQueries";
import ButtonAppBar from "./Navibar";
import { Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "./Home";
import { createContext } from "react";
import { useState } from "react";

export const serverUrl = "https://issuesbackend.vercel.app";
export const MainContext = createContext();

function App() {
  const [admin, setAdmin] = useState(window.localStorage.getItem("admin"));
  const [login, setLogin] = useState(window.localStorage.getItem("login"));
  const [user, setUser] = useState(window.localStorage.getItem("name"));

  return (
    <div className="App w-full h-screen">
      <MainContext.Provider
        value={{ admin, setAdmin, login, setLogin, user, setUser }}
      >
        <ButtonAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {login === "true" ? (
            <>
              <Route path="/queryform" element={<QueryForm />} />
              {admin === "true" ? (
                <Route path="/admin" element={<AdminQueries />} />
              ) : null}
              <Route path="/user" element={<UserQueries />} />
            </>
          ) : null}
          {login !== "true" ? (
            <>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </>
          ) : null}
        </Routes>
      </MainContext.Provider>
    </div>
  );
}

export default App;
