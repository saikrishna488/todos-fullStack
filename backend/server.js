
const express = require("express");
const cors = require("cors");

const port = 5000 || process.env.PORT;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


//routes
app.use("/",require("./routes/todo"))



app.listen(port, () => {
    console.log("server is running on port", port);
})