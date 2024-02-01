import logo from "/logo.png";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";

// TEST ACCOUNT:
//fakeemail@hotmail.com
// testtest1!
function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((res) => {
        console.log(res);
        axios.post(
          `${BACKEND_URL}/listings/users`,
          { userEmail: user.email },
          {
            headers: {
              Authorization: `Bearer ${res}`,
            },
          }
        );
      });
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <>
      <img src={logo} className="logo react" alt="React logo" />
      <h1>Carousell Frontend</h1>
      {isAuthenticated && (
        <p>
          <strong>Welcome, {user.email} !</strong>
        </p>
      )}
      <button onClick={loginWithRedirect}>Log In</button>
      <br />
      <br />
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
      <br /> <br />
      {/* {isAuthenticated && ( */}
      <div className="card">
        <Outlet />
      </div>
    </>
  );
}

export default App;
