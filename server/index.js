const express = require("express");
const Connect = require("./config/connect");
const cookieParser = require("cookie-parser");
const app = express();



app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

Connect();

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/category"));
app.use("/api", require("./routes/order"));
app.use("/api", require("./routes/product"));
app.use("/api", require("./routes/user"));

const Port = process.env.PORT || 5000;


app.listen(Port, () => console.log(`Server running on port ${Port}`));

