import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { BACKEND_URL } from "../../constants.jsx";
import { useAuth0 } from "@auth0/auth0-react";

const Listing = () => {
  const [listingId, setListingId] = useState();
  const [listing, setListing] = useState({});

  const [token, setToken] = useState("");
  const { isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        const fetchToken = await getAccessTokenSilently();
        setToken(fetchToken);
      }
    };
    fetchData();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  useEffect(() => {
    // RENDERING - If there is a listingId, retrieve the listing data
    if (listingId) {
      axios.get(`${BACKEND_URL}/listings/${listingId}`).then((response) => {
        setListing(response.data);
      });
    }
  }, [listingId]);

  // Update listing ID in state if needed to trigger data retrieval
  const params = useParams();
  if (listingId !== params.listingId) {
    setListingId(params.listingId);
  }

  // Store a new JSX element for each property in listing details
  const listingDetails = [];
  if (listing) {
    for (const key in listing) {
      listingDetails.push(<Card.Text key={key}>{`${key}: ${listing[key]}`}</Card.Text>);
    }
  }

  const handleClick = async () => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/listings/${listingId}`,
        { userEmail: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
      setListing(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <Card bg="light">
        <Card.Body>
          {listingDetails}

          {isAuthenticated ? (
            <Button onClick={handleClick} disabled={listing.BuyerId}>
              Buy
            </Button>
          ) : (
            <button onClick={loginWithRedirect}>Buy</button>
          )}
        </Card.Body>
      </Card>
      <br />
    </div>
  );
};

export default Listing;
