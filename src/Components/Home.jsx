import { Link } from "react-router-dom";
import ListingPreviewList from "./ListingPreviewList";

import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <div>
      {isAuthenticated ? (
        <Link to="/listings/new">Sell</Link>
      ) : (
        <button onClick={loginWithRedirect}>Sell</button>
      )}

      <br />
      <br />
      <ListingPreviewList />
    </div>
  );
};

export default Home;
