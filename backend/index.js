const express = require("express");
const { connection } = require("./db");

const { router, formrouter } = require("./routes/form.router");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/form",formrouter);
app.get('/', (req, res) => {

    res.send('POST request to /create');
  });

app.listen(8080, async () => {
  console.log("sever is running");
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log("somehing went wrong");
  }
});
