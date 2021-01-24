const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.url === "/api/users") {
    const users = [{ name: "tony" }, { name: "gary" }, { name: "ally" }];
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(users));
  }
});

server.listen(8080, () => {
  console.log("the server is running on 8080");
});
