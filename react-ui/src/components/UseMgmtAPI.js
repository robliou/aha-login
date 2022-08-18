const UseMgmtAPI = () => {
  var axios = require("axios").default;

  var options = {
    method: "POST",
    url: "https://dev-7-8i89hb.us.auth0.com/oauth/token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "6J2cpQGzD456WzodmDHXj4Kot4y84bgI",
      client_secret:
        "fVXUOHUTvH5rk_ydPwIgOb1Vf2bBr24266oc6ZkF5jFolTP0PlzhiEtxGYXUx26F",
      audience: "https://dev-7-8i89hb.us.auth0.com/api/v2/",
    }),
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  return <div></div>;
};

export default UseMgmtAPI;
