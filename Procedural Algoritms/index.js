const app = require('express')();
const cors = require('cors');
app.use(cors());


process.env.PORT = process.env.PORT || 80;


// routes
app.use( require("./routings") );



const serverInitResponseHandler = error => console[error ? `error` : `log`](error ||  `server listening on port ${process.env.PORT}`); 
app.listen(process.env.PORT, serverInitResponseHandler)

