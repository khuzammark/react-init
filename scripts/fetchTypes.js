const https = require("https");
const axios = require("axios");
const fs = require("fs");

/* eslint-disable no-console */
const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});
instance
  .request({
    url: process.env.GRAPHQL_ROOT || "https://localhost:8003/graphql/",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    responseType: "json",
    data: {
      variables: {},
      operationName: "",
      query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
    }
  })
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.data.__schema.types.filter(
      type => type.possibleTypes !== null
    );
    result.data.data.__schema.types = filteredData;
    fs.writeFile(
      "./src/fragmentTypes.json",
      JSON.stringify(result.data.data),
      err => {
        if (err) {
          console.error("Error writing fragmentTypes file", err);
        } else {
          console.log("Fragment types successfully extracted!");
        }
      }
    );
  });
