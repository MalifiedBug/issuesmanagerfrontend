import "./App.css";
import QueryForm from "./components/QueryForm";
import AdminQueries from "./components/AdminQueries";
import UserQueries from "./components/UserQueries";
import ButtonAppBar from "./Navibar";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { createContext } from "react";
import { useState } from "react";
import Pricing from "./components/Pricing";
import Payment from "./Payment";
import NotFound from "./NotFound";
import Profile from "./components/Profile";

export const serverUrl = "http://localhost:4000";
// https://issuesbackend.vercel.app
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
        {/* navbar */}
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
              <Route path="/profile" element={<Profile />} />
            </>
          ) : null}
          {login !== "true" ? (
            <>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/payment/:id" element={<Payment />} />              
            </>
          ) : null}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainContext.Provider>
    </div>
  );
}

export default App;
