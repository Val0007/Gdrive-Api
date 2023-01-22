const { default: axios } = require("axios");

function get_access_token_using_saved_refresh_token() {
    // from the oauth playground
    const refresh_token = ""
    // from the API console
    const client_id = "";
    // from the API console
    const client_secret = "";
    // from https://developers.google.com/identity/protocols/OAuth2WebServer#offline
    const refresh_url = "https://www.googleapis.com/oauth2/v4/token";

    const post_body = `grant_type=refresh_token&client_id=${encodeURIComponent(client_id)}&client_secret=${encodeURIComponent(client_secret)}&refresh_token=${encodeURIComponent(refresh_token)}`;

    let refresh_request = {
        body: post_body,
        method: "POST",
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    // post to the refresh endpoint, parse the json response and use the access token to call files.list
    // axios(refresh_url, refresh_request).then( response => {
    //         return(response.json());
    //     }).then( response_json =>  {
    //         console.log(response_json);
    //         console.log(response_json.access_token);
    // });

    axios({
        method: 'POST',
        url: refresh_url, 
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:post_body
      })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log("Error", error.response.data);
      
      });
}

get_access_token_using_saved_refresh_token()
