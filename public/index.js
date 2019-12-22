require("dotenv").config({
  path: __dirname + "/../.env"
});
var PROJECT_ID = process.env.ALGOLIA_ID; // Required - your Firebase project ID
var ALGOLIA_APP_ID = process.env.ALGOLIA_ID; // Required - your Algolia app ID
