const express = require("express");
const router = express.Router();

const passport = require("passport");
const db_connect = require("../../config/db_connect");
const server_constants = require("../../config/server_constants");

//const bodyParser = require("body-parser");

let {PythonShell} = require('python-shell');

// Load Input Validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");



//const photoHelper = require("../../config/photoHelper");

const  Client = require("pg");
const Pool = require('pg').Pool;




//**************************
// MEASUREMENTS
//**************************
// gold implementation.  use this technique
// this is currently triggered from alarms screen launch button
router.get("/setting/:what",
  // passport.authenticate("jwt", {
  //   session: false,
  //   failureRedirect: "/jwt_auth_error"
  // }),
  (req, res) => {
   // console.log("we passed auth and are in dashboard api setting");
    let what = req.params.what;
   // console.log("we are in dashboard api setting what is ",what);

    let errors = {};
    let cdate = new Date();
    let h = cdate.getHours().toString();
    let m = cdate.getMinutes().toString();
    let s = cdate.getSeconds().toString();
    if (h.length == 1) h = "0" + h;
    if (m.length == 1) m = "0" + m;
    if (s.length == 1) s = "0" + s;
    let timestr = h + ":" + m + ":" + s;
    timestr = 'test: ' + timestr;

    //let results = {"one":timestr,error:{errorcode:0,errormsg:"we are good"}};
    let results = { "one": timestr };
    if (what == 1) {
      results = { errorcode: 1, errormsg: "we have a problem with setting" };
      //console.log("**** returning error because what is 1");
      return res.status(404).json(results);
    }

    return res.json(results);


  });

router.get("/measurements", (req, res) => {
 // console.log("in user api about to register");
//   const { errors, isValid } = validateRegisterInput(req.body, true);
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

// let errors = {};

// const pool = new Pool(db_connect);

 
// const newUser = {
//   name: req.body.name,
//   email: req.body.email,
//   password: req.body.password
// };


let qry = '';

  let cdate = new Date();
  let h = cdate.getHours().toString();
  let m = cdate.getMinutes().toString();
  let s = cdate.getSeconds().toString();
  if (h.length == 1) h = "0" + h;
  if (m.length == 1) m = "0" + m;
  if (s.length == 1) s = "0" + s;
  let timestr = h + ":" + m + ":" + s;
  timestr = 'dashboard measurements: ' + timestr;

let results = {"one":timestr,error:{errorcode:0,errormsg:"we are good"}};
let eresults = {error:{errorcode:1,errormsg:"we have a problem with measurements"}};
//errors.measurements = "We have a propblem with measurements";
//return res.status(404).json(eresults);

return res.json(results);


});

router.get("/location", (req, res) => {
 
   let cdate = new Date();
  
   let timestr = cdate.toString();
   timestr = 'dashboard location: ' + timestr;
 
 let results = {"one":timestr};
 return res.json(results);
 
 
 });

 //let urlencodedParser = bodyParser.urlencoded({extended: true});

router.post("/socket", (req, res) => {
  let arg = req.body.id;
  if (!arg) arg = 'network';
  console.log("api post arg is", arg);

  let rdata = "";
  var net = require('net');

  var client = new net.Socket();
  client.connect(8080, '127.0.0.1', function () {
    console.log('Connected');
    client.write(arg);
  });

  client.on('data', function (data) {
    //rdata = 'Received: ' + data;
    //console.log('Received: ' + data);
    // return res.json(data);
    //console.log('Received: ' + data);
    client.destroy(); // kill client after server's response
    return res.json(data);
  });

  client.on('close', function () {
    console.log('Connection closed');
  });

});

// module.exports  = {
//   python_script_path: '/home/jjv/react/timescale/socket/',
//   python_script: 'get_device_info.py'
// };

router.post("/python", (req, res) => {
  let python_install_path = server_constants.python_install_path;
  let filenamepath = server_constants.python_script_path + server_constants.simulated_1900_datafile;
  let scriptpath = server_constants.python_script_path;
  let script = server_constants.python_script;
  // console.log("filenamepath",filenamepath);
  // console.log("scriptpath",scriptpath);
  // console.log("script",script);
  let arg = req.body.id;
  if (!arg) arg = 'network';
  console.log("api post arg is",arg);
  // console.log("api post req.body is",req.body);
  //console.log("api post req is",req);
  let options = {
    mode: 'json',
    pythonPath: python_install_path,
  //  pythonOptions: ['-u'], // get print results in real-time
   // scriptPath: '/home/jjv/react/timescale/python/',
   scriptPath: scriptpath,
    args: [arg,filenamepath]
  };

  PythonShell.run(script, options, function (err, results) {
   // PythonShell.run('get_device_info.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution

   // console.log('results: %j', results);
    return res.json(results);
  });
});

//**************************
// CHANGE STATUS
//**************************

// router.get("/change-advertiser-status/:id/:status", (req, res) => {
//   //console.log("in advertisers get change-advertiser-status", req.params);
//   let id = req.params.id;
//   let curstat = req.params.status;
//   let updatestat = 0;
//   if (curstat == "0") {
//     updatestat = 1;
//   }
//   let query = { _id: id };
//   var updateobj = { status: updatestat };
//   var options = { new: true };

//   Advertiser.findOneAndUpdate(query, updateobj, options)
//     .then(function(advertiser) {
//       return res.json(advertiser);
//     })
//     .catch(err =>{errorcode:1,errormsg:"we have a problem with setting"};
//       res.status(404).json({ nousersfound: "no advertiser found" })
//     );
// });


// router.get(
//   "/current",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email
//     });

//     // res.json({ msg: "Success" });
//   }
// );


// **********************************************
// **********************************************
// here and below are not being used
// **********************************************
// **********************************************


module.exports = router;
