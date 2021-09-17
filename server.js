const app = require("./app");

if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: ".env" });

require("./mongoose");

const port = process.env.PORT || 9001;

app.listen(port, () => console.log(`Server on PORT ${port}`));
