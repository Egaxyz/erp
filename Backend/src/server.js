require("dotenv").config();
const app = require("./app");
const routes = require("./routes");

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
