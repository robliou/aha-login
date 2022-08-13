import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { gql } from "@apollo/client";
/* import { Loader, ApolloTableQL  } from 'react-tableql'
 */ import "./../styles/Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { Table } from "react-bootstrap";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  let navigate = useNavigate();

  const [visible, setVisible] = useState("false");

  const GET_SELL_OFFERS_QUERY = gql`
    query getSellOffers($userId: String) {
      sell_offers(where: { user_id: { _eq: $userId } }) {
        industry
        languages
        user_id
        offer_type
        qualifications
        offer_details
        price
        sell_offer_id
        headline
      }
    }
  `;

  const GET_BUY_OFFERS_QUERY = gql`
    query getBuyOffers($userId: String) {
      buy_offers(where: { user_id: { _eq: $userId } }) {
        industry
        languages
        user_id
        offer_type
        qualifications
        offer_details
        price
        buyOfferId
        headline
        rate_type
      }
    }
  `;

  const GET_USERS_QUERY = gql`
    query getUsers {
      users {
        created_at
        user_id
        email
      }
    }
  `;
  /* const { loading, error, data } = useQuery( UsersQuery);   */
  /* 
  const userId = user.sub;

  console.log("this is the userId:", userId); */

  /* const {loading:user_loading, error:user_error, data:user_data } = useQuery(GET_SELL_OFFERS_QUERY, {
  variables: { userId }   
   }
); */
  //UseQuery goes unused!! Using UseLazyQuery instead!

  const [getUser, { loading, error, data }] = useLazyQuery(
    GET_SELL_OFFERS_QUERY,
    {
      onCompleted: () => {
        setVisible("true");
      },
    }
  );

  const [
    getUserBuy,
    { loading: user_loading_buy, error: user_error_buy, data: user_data_buy },
  ] = useLazyQuery(GET_BUY_OFFERS_QUERY, {
    onCompleted: () => {
      setVisible("true");
    },
  });

  const [
    getUsersNow,
    { loading: users_loading, error: users_error, data: users_data },
  ] = useLazyQuery(GET_USERS_QUERY, {
    onCompleted: () => {
      setVisible("true");
    },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;

  if (users_loading) return <p>Loading...</p>;
  if (users_error) return `Error! ${users_error.message}`;
  else {
    return isAuthenticated ? (
      <div id="profileContainer">
        <div>
          <div id="userInfo">
            <img src={user.picture} alt={user.name} id="profilePic" />
            <br></br>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>User ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.name} </td>
                  <td>{user.first_name} </td>
                  <td>{user.last_name} </td>
                  <td>{user.email} </td>
                  <td>{user.sub} </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <br></br>
          Hello!
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>User Id</th>
                <th>Email</th>
                <th>Created at</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{users_data.users[0].user_id} </td>
                <td>{users_data.users[0].email} </td>
                <td>{users_data.users[0].created_at} </td>
              </tr>
            </tbody>
          </Table>
          <button
            class="buttonProfile"
            onClick={() => getUser({ variables: {} })}
          >
            Reset password
          </button>
          <button
            class="buttonProfile"
            onClick={() => getUsersNow({ variables: {} })}
          >
            Get Users
          </button>
          <button
            class="buttonProfile"
            onClick={() => getUserBuy({ variables: {} })}
          >
            My Offers
          </button>
        </div>

        {visible === "true" && users_data ? (
          <div id="showUsers">
            Users Data
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Email</th>
                  <th>Created at</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{users_data.users[0].user_id} </td>
                  <td>{users_data.users[0].email} </td>
                  <td>{users_data.users[0].created_at} </td>
                </tr>
              </tbody>
            </Table>
          </div>
        ) : (
          ""
        )}

        {visible === "true" && user_data_buy ? (
          <div id="showBuyOffers">
            Buy Offer Data
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Headline</th>
                  <th>Offer details</th>
                  <th>Offer type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user_data_buy.buy_offers[0].headline} </td>
                  <td>{user_data_buy.buy_offers[0].offer_details} </td>
                  <td>{user_data_buy.buy_offers[0].offer_type} </td>
                </tr>
              </tbody>
            </Table>
            {user_data_buy ? (
              <Link
                to={`/EditBuyOffer/${user_data_buy.buy_offers[0].buyOfferId}`}
              >
                <button class="buttonProfile">Click to edit buy offer</button>
              </Link>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    ) : (
      ""
    );
  }
};

export default Profile;

/* ApolloTableQL
  query={UsersQuery}
  columns={['first_name', 'last_name','user_id', 'created_at' ]}
   /> */

//Having weird issue when trying to fetch from more than one database. For now, just fetch from one database until further notice...
