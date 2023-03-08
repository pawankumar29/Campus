// import dotenv from "dotenv";
// import { appendFile } from "fs";
// import express from "express";
// import dbConnect from "./core/connection.js";
// import flash from "connect-flash"
// import passport from "passport";
// import session from "express-session";
// dotenv.config();
// import authenticationrouter from "./modules/Authentication/router.js";
// const app = express();

// dbConnect();
// app.use(flash()) // for flashing the messages
// app.use(express.json()) // to get the json data
// app.use(session({
//   secret: 'my-secret-key',
//   resave: false,
//   saveUninitialized: false
// }));
// // to use the passport 
// app.use(passport.initialize());
// app.use(passport.session());



// //routers
// app.use("/v1",authenticationrouter);



// app.listen(3035, () => {
//   console.log("app is listening");
// });



import dotenv from "dotenv";
import express from "express";
import dbConnect from "./core/connection.js";
import flash from "connect-flash"
import passport from "passport";
import session from "express-session";
import authenticationrouter from "./modules/Authentication/router.js";
import { initialize } from "./helpers/passport.js";
dotenv.config();
dbConnect();

const app = express();

app.use(express.json()); // to get the json data
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(flash()); // for flashing the messages
initialize(passport);
// to use the passport 
app.use(passport.initialize());
app.use(passport.session());

//routers
app.use("/v1",authenticationrouter);

app.listen(3035, () => {
  console.log("app is listening");
});

