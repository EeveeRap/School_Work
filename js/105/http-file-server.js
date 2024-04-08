const fs = require("fs");
const http = require("http");

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  const fileStream = fs.createReadStream(process.argv[3]);
  fileStream.pipe(res);
});
server.listen(process.argv[2]);
