require("dotenv").config({ path: `./.env.${process.env.NODE_ENV || "dev"}` });
const server = require("./server");

const PORT = process.env.PORT || 1234;

server.listen(PORT, () => {
  console.log(`🎧 Listening on port: ${PORT}\n\nBlasting off... 🚀`);
});
