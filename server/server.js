const express = require("express");
const cors = require("cors");
const router = require("./src/routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "welcome to bezkoder application.",
  });
});

app.use("/api/", router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is runing on ${PORT}`));
