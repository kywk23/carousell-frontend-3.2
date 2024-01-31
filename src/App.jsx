import logo from "/logo.png";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

// TEST ACCOUNT:
//fakeemail@hotmail.com
// testtest1!
function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  useEffect(() => {
    console.log(isAuthenticated);
    console.log(user);
  }, [user]);

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
