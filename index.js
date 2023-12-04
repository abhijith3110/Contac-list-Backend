const express = require('express');
const route = require("./Routes/Routes.js");
const cors = require('cors')
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors())
app.use("/contacts/api", route);

app.listen(port, () => {
    console.log(`port is successfully running in ${port}`);
});
