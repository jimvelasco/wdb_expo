const express = require("express");
const cors = require('cors');

const fs = require('fs');


const bodyParser = require("body-parser");
const passport = require("passport");

const path = require("path");

const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");




const users = require("./routes/api/users");
//const measurements = require("./routes/api/measurements");
const dashboard = require("./routes/api/dashboard");
const clocks = require("./routes/api/clocks");


const app = express();
// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// const watchFile = require("./socket/watcher.js");



// Body Parser middleware


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.static(__dirname));






// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);



app.use("/api/users", users);
app.use("/api/dashboard", dashboard);
app.use("/api/clocks", clocks);

app.get('/jwt_auth_error', (req, res) => {
  res.status(401).send({ errorcode: 1, errormsg: "Not Authorized" });
});



console.log("process.env.NODE_ENV",process.env.NODE_ENV);

// const env_for_static = [ "production", "serverdemo" ];
// if (env_for_static.includes(process.env.NODE_ENV)) {

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  //

  // need module path for this imported at top
  // so now any requests other than the ones above will go to index.html
  // find out express app.get(*)

  // any route that gets hit here in client.build will go to index.html
  app.get("*", (req, res) => {
    // go to client/build/index.html
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// DEVELOPMENT NOTE
// WE CAN CHANGE PORT OF SERVER HERE
// CLIENT package.json MODIFICATIONS
// NEED TO MAKE SURE THE CLIENT package.json HAS THE PROPER PROXY SETTING
// "proxy": "http://localhost:5000"
// ALSO, PUT THE CLIENT SERVER ON A DIFFERENT PORT IN THE START SCRIPT
// "start": "PORT=3000 react-scripts start",
const port = process.env.PORT || 5000;



server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});



app.get('/express_backend', (req, res) => {
  //res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  gsocket.emit("FromAPI", 'xx:xx:xx');
});

//const filetowatch = '/home/jjv/out.txt';
//watchFile(filetowatch);


const io = socketIo(server);

//const io = socketIo.connect({transports: ['websocket']});
//console.log(io);
let gsocket = null;
let counter = 0;

io.on("connection", socket => {
  console.log("New socket client connected"), 
  setInterval(
    () => sendTimeToClient(socket),
    30000
  );
  gsocket = socket;
  socket.on("disconnect", (reason) => console.log("Client socket disconnected",reason));
});

const sendTimeToClient = async socket => {
  let cdate = new Date();
  let h = cdate.getHours().toString();
  let m = cdate.getMinutes().toString();
  let s = cdate.getSeconds().toString();
  let ms = cdate.getMilliseconds().toString();
  if (h.length == 1) h = "0" + h;
  if (m.length == 1) m = "0" + m;
  if (s.length == 1) s = "0" + s;
  let timestr = h + ":" + m + ":" + s + ":" + ms;
  //timestr = timestr + ' count:' + counter.toString();
  counter = counter + 1;
  socket.emit("FromAPI", timestr);
 
};




// io.on("connection", socket => {
//   console.log("New client connected");
//    getApiAndEmit3(socket);
//   socket.on("disconnect", () => console.log("Client disconnected"));
// });


// const getApiAndEmit = async socket => {
//   try {
//     const res = await axios.get(   
//       "https://api.darksky.net/forecast/708a9e5200c205089ed11d5c3212dab1/37.8267,-122.4233"
//     );
//     socket.emit("FromAPI", res.data.currently.temperature);
//   } catch (error) {
//     console.error(`Error: ${error.code}`);
//   }
// };


// const getApiAndEmit3 = async socket => {
//   const buttonPressesLogFile = './testfile.js';
//   console.log(`Watching for file changes on ${buttonPressesLogFile}`);
//   fs.watch(buttonPressesLogFile, (event, filename) => {
//     if (filename && event === 'change') {
//       let cdate = new Date();
//       let h = cdate.getHours();
//       let m = cdate.getMinutes();
//       let s = cdate.getSeconds();
//       let timestr = h + ":" + m + ":" + s;
//       console.log(`${filename} file Changed ${event}`);
//       let rstr = `${filename} file Changed ${timestr}`;
//       socket.emit("FromAPI", rstr);
//     }
//   });
// };

// require('net').createServer(function (socket) {
//   console.log("connected");

//   socket.on('data', function (data) {
//       console.log(data.toString());
//   });
// })
// .listen(8080);





//mongodb://<dbuser>:<dbpassword>@ds061188.mlab.com:61188/devconnect
