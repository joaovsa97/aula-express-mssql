const express = require("express");
const app = express();
const db = require("./models/index.js");

const port = 3000;
db.sequelize.sync();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/user.routes") (app);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
