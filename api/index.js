require("cross-fetch/polyfill");
const { ApolloClient, InMemoryCache, gql } = require("@apollo/client");
const express = require("express");
const fetch = require("cross-fetch");
const app = require("express")();
const bodyParser = require("body-parser");
const port = 3001;

const client = new ApolloClient({
  uri: "https://arabovs-api.hasura.app/v1/graphql",
  fetch: fetch,
  cache: new InMemoryCache(),
  headers: {
    "content-typefrom": "application/json",
    "x-hasura-admin-secret":
      "6NIm5o8FZvg47gwR5ef1wWPJZjEBRbeUwr5GPKdC0SVtkDM4BGbOjxtnnomAmFjJ",
  },
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const endPointCall = (req, res) => {
  console.log(req.body);
  client
    .mutate({
      mutation: gql`
        mutation GetRates($input: String) {
          insert_api_writes(objects: { input: $input }) {
            affected_rows
          }
        }
      `,
      variables: {
        input: req.body.a,
      },
    })
    .then((result) => console.log(result));
  res.json(req.body);
};

app.post("/post/", endPointCall);

app.get("/", async (req, res) => {
  const data = await client.query({
    query: gql`
      query MyQuery {
        api_writes(limit: 1) {
          input
        }
      }
    `,
  });
  res.send(data.data.api_writes[0].input);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
