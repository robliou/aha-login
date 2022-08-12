import { useState } from "react";
import styled from "@emotion/styled";
import { useAuth0 } from "@auth0/auth0-react";

import { useQuery } from "@apollo/client";
import { InMemoryCache, ApolloClient, gql } from "@apollo/client";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, NavLink, useParams } from "react-router-dom";
import "./../styles/UserDashboard.css";

//NOTE- FOR SOME STRANGE REASON, SELLINDEX.JS IS STILL PULLING SOME CSS PROPERTIES FROM ORDERINDEX.JS; DUNNO WHY???
//REASON is because - never give a className "grid"... it confuses the JS!

const breakpoints = [480, 768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
//From the Odyssey lift-off-pt3 doc

/**
 * Track Detail component renders the main content of a given track:
 * author, length, number of views, modules list, among other things.
 * It provides access to the first module of the track.
 */
const BuyIndex = () => {
  const { user } = useAuth0();

  const BUY_OFFERS_QUERY = gql`
    query GetBuyOffers($buyOfferId: Int!) @cached {
      buy_offers(where: { buyOfferId: { _eq: $buyOfferId } }) {
        user_id
        price
        buyOfferId
        industry
        offer_type
        headline
        offer_details
        languages
        rate_type
        qualifications
      }
      users(where: { buy_offers: { buyOfferId: { _eq: $buyOfferId } } }) {
        email
        first_name
        picture
        email
        last_name
        linked_in
      }
    }
  `;

  /* const client = new ApolloClient({
   ...other arguments...
  cache: new InMemoryCache(),
  connectToDevTools: true,
  uri: `https://bright-mullet-79.hasura.app/v1/graphql/`,

});
 */

  const [key, setKey] = useState("home");

  const { buyOfferId } = useParams();

  var num = Number(buyOfferId);

  /* const {loading, error, data } =  useQuery(GET_SELL_OFFERS_QUERY); */

  const { loading, error, data } = useQuery(BUY_OFFERS_QUERY, {
    fetchPolicy: "cache-and-network",

    variables: { buyOfferId: num },
    onCompleted: () => {
      setVisible("true");
    },
  });

  /* const userId = user.sub; */

  /* const {loading:user_loading, error:user_error, data:user_data } =  useQuery(GET_USERS, {
  variables: {userId},
  onCompleted: () => {
    setVisible('true');
  }
}); */

  const [visible, setVisible] = useState("false");

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  /* if(user_loading) return 'Loading...';
if(user_error) return `Error! ${user_error.message}`;  

 */

  const values = Object.values(data);

  //-----------------caching------------------

  /* const cache = new InMemoryCache({
  typePolicies: {
    User: {
      // In an inventory management system, products might be identified
      // by their UPC.
      keyFields: ["user_id"],
    },
}});
 */

  /* const get_user = client.readQuery({
  query: GET_USERS,
  variables: { // Provide any required variables here
    user_id: userId,
    id: userId,
  },
}); */

  //---caching to make pages load faster- from: https://www.apollographql.com/docs/react/caching/cache-configuration

  /* const users1 = Object.values(user_data);

const filteredUsers = users1.filter((item) => {
 return (item.user_id === 'linkedin|uiWV-hd6Jm'); 
}
);

 */

  let linky = "https://" + data.users[0].linked_in;
  console.log("here is link", linky);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Pre-communication with the buyer is very important prior to reserving a
      request with him or her!
    </Tooltip>
  );

  return visible === "true" && data ? (
    <div id="grid">
      <div id="banner_sell">
        <h1 className="h1">Connect with a Buyer</h1>
      </div>
      <div id="picture_area_track_buyIndex">
        <CoverImage id="coverImage_buy" src={data.users[0].picture} alt="" />
        <DetailItem id="linkedinButton_buyIndex">
          <a href={linky} target="_blank">
            <button color="pink" size="large">
              See {data.users[0].first_name}'s LinkedIn Profile
            </button>
          </a>
        </DetailItem>
      </div>
      <TrackDetails id="trackDetails_buyIndex">
        <CardContainer>
          <CardContent>
            <CardBody>
              <CardTitle>
                {data.users[0].first_name} {data.users[0].last_name}
              </CardTitle>
              <DetailRow>
                <div id="headline">
                  Research/Services desired:{" "}
                  <b> {data.buy_offers[0].headline} </b>
                </div>
              </DetailRow>
              <DetailRow>
                <div id="industry">
                  Industry: <b> {data.buy_offers[0].industry} </b>{" "}
                </div>
              </DetailRow>
              <DetailRow>
                <div id="languages">
                  Languages: <b> {data.buy_offers[0].languages} </b>{" "}
                </div>{" "}
              </DetailRow>
              <CardFooter></CardFooter>
            </CardBody>
          </CardContent>
        </CardContainer>
      </TrackDetails>

      <div id="BottomDetail_buyIndex">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          transition={false}
          className="mb-3"
        >
          <Tab eventKey="home" title="Details" id="tab1">
            <DetailRow>
              <div id="qualifications">
                Qualifications: <b>{data.buy_offers[0].qualifications} </b>{" "}
              </div>
            </DetailRow>
            <DetailRow>
              <div id="offer_details">
                {" "}
                Offer Details: <b>{data.buy_offers[0].offer_details} </b>
              </div>
            </DetailRow>
          </Tab>
          <Tab eventKey="background" title="Background">
            <h3> Company Background </h3>
          </Tab>
        </Tabs>

        <NavLink to="/InputForm">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <button color="pink" size="large" id="buttonInput">
              Send {data.users[0].first_name} a message
            </button>
          </OverlayTrigger>
        </NavLink>
      </div>

      <div id="box_track_buyIndex">
        <DetailRow id="DetailRow">
          <div id="rate_type">
            Rate type: <b>{data.buy_offers[0].rate_type} </b>
          </div>
        </DetailRow>
        <DetailRow id="DetailRow">
          <div id="price">
            {" "}
            Price: <b>{data.buy_offers[0].price}</b>{" "}
          </div>
        </DetailRow>
        <DetailRow id="DetailRow">
          <div id="offerType">
            {" "}
            Offer Type: <b>{data.buy_offers[0].offer_type} </b>{" "}
          </div>
        </DetailRow>

        <NavLink to={`/Buy/BuyDetail/${data.buy_offers[0].buyOfferId}`}>
          <button color="pink" size="large">
            Continue transaction
          </button>
        </NavLink>

        <br></br>

        <NavLink to={`/Buy`}>
          <button color="pink" size="large">
            Return to buy list
          </button>
        </NavLink>
      </div>
    </div>
  ) : (
    ""
  );
};

export default BuyIndex;

/** Track detail styled components */
const CardContainer = styled.div({
  borderRadius: 6,
  backgroundSize: "cover",
  backgroundColor: "silver",
  boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.15)",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [mq[0]]: {
    width: "90%",
  },
  [mq[1]]: {
    width: "47%",
  },
  [mq[2]]: {
    width: "90%",
  },
  /*   height: 750,
   */
  margin: 10,
  overflow: "hidden",
  position: "relative",
  border: "solid 1px grey",

  cursor: "pointer",
  textDecoration: "none",
});

const CardContent = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  height: "100%",
});

const CardTitle = styled.h3({
  textAlign: "center",
  fontSize: "1.4em",
  lineHeight: "1em",
  fontWeight: 700,
  flex: 1,
});

const CoverImage = styled.img({
  objectFit: "cover",
  maxHeight: 400,
  borderRadius: 4,
  marginBottom: 30,
});

const CardBody = styled.div({
  padding: 18,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
});

const CardFooter = styled.div({
  display: "flex",
  flexDirection: "Row",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "white",
});

const TrackDetails = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  borderRadius: 4,
  marginBottom: 30,
  /* border: 'solid 1px silver',
  backgroundColor: 'silver', */
  h1: {
    width: "100%",
    textAlign: "center",
    marginBottom: 5,
  },
  h4: {
    fontSize: "1.2em",
    marginBottom: 5,
    color: "black",
  },
});

const DetailRow = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  textalign: "center",
  width: "100%",
  paddingBottom: 20,
  marginBottom: 20,
  borderBottom: "solid 1px lightgrey",
});

const DetailItem = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  color: "grey",
  alignSelf: "center",
  textalign: "center",
});

const AuthorImage = styled.img({
  height: 30,
  width: 30,
  marginBottom: 8,
  borderRadius: "50%",
  objectFit: "cover",
});

const ModuleListContainer = styled.div({
  width: "100%",
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginTop: 5,
    li: {
      fontSize: "1em",
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: 2,
    },
  },
});

const ModuleLength = styled.div({
  marginLeft: 30,
  color: "grey",
});
