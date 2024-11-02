const express = require("express");
const bodyParser = require("body-parser");
const Cors = require("cors");

const UserRoute = require("./routes/userRoute");  
const AdminRoute = require("./routes/adminRoute");

const app = express();
app.use(Cors());
app.use(bodyParser.json());

app.use('/user', UserRoute);  
app.use('/admin', AdminRoute);

app.listen(8383, () => {
    console.log("Server is listening on port 8383");
});
