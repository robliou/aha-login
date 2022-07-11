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

  var axios = require("axios").default;

  var options = {
    method: "GET",
    url: '"postgres://mcdyzqzn:tNZhAqSUXzbdvAGBM4QdN7kpQa-Rz3Js@john.db.elephantsql.com/mcdyzqzn/user',
    params: { q: 'email:"jane@exampleco.com"', search_engine: "v3" },
    headers: { authorization: "Bearer YOUR_MGMT_API_ACCESS_TOKEN" },
  };

  const grabUser = () => {
    const options = {
      method: "GET",
      url: "https://dev-7-8i89hb.us.auth0.com/api/v2/users",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InFNR05LbTVqb2Q3b1FGcDRRNG1RYyJ9.eyJodHRwczovL215YXBwLmlvL2NsYWltcyI6eyJyb2xlIjoiQWRtaW4ifSwiaXNzIjoiaHR0cHM6Ly9kZXYtNy04aTg5aGIudXMuYXV0aDAuY29tLyIsInN1YiI6Iks1Yjd4czJ2VnFSbUllOG4xVUdJR1pkY1BobHRnZHp3QGNsaWVudHMiLCJhdWQiOiJodHRwczovL2Rldi03LThpODloYi51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY1NzUyNTE4OSwiZXhwIjoxNjU3NjExNTg5LCJhenAiOiJLNWI3eHMydlZxUm1JZThuMVVHSUdaZGNQaGx0Z2R6dyIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zX3N1bW1hcnkgcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.BXEuV6D537nUX-JkENcfMUIH5ljuKRnFGA8_SPuoQOO9x6162PmpucaJwkxbCGoeaErFczwV_JtonCv_SLFz6k64_D3AbKOY1G3eXzHe2xNuIleydgKpa5NhNnm5LlBVl3CN6bllaT4Up1JUfj9SDMfXmFJjH12sUFY8a1ZfpSDtcYJaT4Tq6dS3m9S6sULzNP_CxFbG-sAnE5ZtEOGAu0qj30y8dyzHgm8z3NV0ppgtehcZUlm-70PiGFVXThy3j38oTZ422x123W4ytD7jqrg1p6LQ5gPD8JoJoH710LsZ3IOhAsRZNV80oEwf9VcqVoW9OqvU7L1f4bM7_WiC9A",
      },
    };

    axios(options)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      const users2 = response.data;

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

          <button class="buttonProfile" onClick={() => grabUser()}>
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
