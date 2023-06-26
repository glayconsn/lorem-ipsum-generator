const express = require("express");
const app = express();

const loremIpsum = (length) => {
  const words = [
    "lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
  ];
  let result = "";
  for (let i = 0; i < length; i++) {
    result += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return result.trim();
};

var index = 0;
var response = "";
app.get("/sse", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });
  setInterval(() => {
    if (index < 10) {
      response = response + loremIpsum(3);
      console.log(response);
      res.write(`data: ${response}\n\n`);
      index++;
    } else {
      res.end();
    }
  }, 1000);
});
app.listen(3003, () => {
  console.log("Servidor rodando na porta 3000");
});
