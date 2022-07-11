import axios from "axios";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./../styles/Profile.css";
import { Table } from "react-bootstrap";
import API from "./API";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);

  const [visible, setVisible] = useState("false");

  /* const { loading, error, data } = useQuery( UsersQuery);   */

  /* const {loading:user_loading, error:user_error, data:user_data } = useQuery(GET_SELL_OFFERS_QUERY, {
  variables: { userId }   
   }
); */
  //UseQuery goes unused!! Using UseLazyQuery instead!

  /*   const client = getUsers();
   */
  /*  const fetchUser = async () => {
    const response = await axios
      .get(`${API}users`)
      .catch((err) => console.log(err));

    if (response) {
      const users2 = response.data;

      console.log("Users:", users2);
    }
  }; */

  const fetchUser = async () => {
    const response = await fetch(
      "postgres://mcdyzqzn:tNZhAqSUXzbdvAGBM4QdN7kpQa-Rz3Js@john.db.elephantsql.com/mcdyzqzn/users"
    )
      .then((response) => response.json()) // one extra step
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));

    if (response) {
      const users2 = response.data[0];

      console.log("Users:", users2);
    }
  };

  /* if(loading) return 'Loading...';
if(error) return `Error! ${error.message}`;    
 

  /* 
if(user_loading) return 'Loading...';
if(user_error) return `Error! ${user_error.message}`;   */

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div id="profileContainer">
        <div>
          <div id="userInfo">
            <br></br>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th> {user.email}</th>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
              </tbody>
            </Table>
          </div>

          <br></br>

          <button class="buttonProfile" onClick={() => fetchUser()}>
            Fetch User
          </button>
        </div>
      </div>
    )
  );
};

export default Profile;

/* ApolloTableQL
  query={UsersQuery}
  columns={['first_name', 'last_name','user_id', 'created_at' ]}
   /> */

//Having weird issue when trying to fetch from more than one database. For now, just fetch from one database until further notice...
