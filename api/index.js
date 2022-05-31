require("cross-fetch/polyfill");
const { ApolloClient, InMemoryCache, gql } = require("@apollo/client");
const express = require("express");
const fetch = require("cross-fetch");
const request = require("request");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const client = new ApolloClient({
  uri: "https://arabovs-api.hasura.app/v1/graphql",
  fetch: fetch,
  cache: new InMemoryCache(),
});

app.use(bodyParser.urlencoded({ extended: false }));

const endPointCall = (req, res) => {
  console.log(req);
  console.log(res.post);
  console.log("haha");
  client
    .mutation({
      mutation: gql`
        mutation GetRates {
          api_writes(objects: { input: res.post }) {
            affected_rows
          }
        }
      `,
    })
    .then((result) => console.log(result));
  res.json(data);
};

var myJSONObject = {};
request(
  {
    url: "http://localhost:3000/d",
    method: "POST",
    json: true, // <--Very important!!!
    body: myJSONObject,
  },
  function (error, response, body) {
    console.log(response);
  }
);

app.post("/c/", endPointCall);

app.get("/", (req, res) => {
  res.send("Please enter api query");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
