console.log("This is the server entry file to start express server");

let app = require("express");
let router = require("./routes/router");

global.port = process.env.port || 9090;

const bodyParser = require("body-parser");
const cors = require("cors");

let expressApp = app();

expressApp.use(cors());
expressApp.use(bodyParser.urlencoded({extended:false}));
expressApp.use('/static', app.static('Public'));

expressApp.use(bodyParser.json({limit:'2mb', extended:false}));

expressApp.use("/", router);

console.log("server is listening at port : " + global.port);
expressApp.listen(global.port);