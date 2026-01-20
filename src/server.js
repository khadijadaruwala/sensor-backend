require("dotenv").config();

require("./config/mqtt");
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
