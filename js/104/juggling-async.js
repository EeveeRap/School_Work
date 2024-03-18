//"use strict";

const http = require("http");
const URL = [process.argv[2], process.argv[3], process.argv[4]];
const myResults = {};
let completedRequests = 0;

URL.forEach((url, index) => {
  http.get(url, (response) => {
    let responseData = "";

    response.setEncoding("utf-8");

    response.on("error", (error) => {
      console.error(error);
    });

    response.on("data", (data) => {
      responseData += data;
    });

    response.on("end", () => {
      myResults[index] = responseData;
      completedRequests++;

      if (completedRequests === URL.length) {
        for (let i = 0; i < URL.length; i++) {
          console.log(myResults[i]);
        }
      }
    });
  });
});
