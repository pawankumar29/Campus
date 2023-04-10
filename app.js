
import dotenv from "dotenv";
import express from "express";
import dbConnect from "./core/connection.js";
import flash from "connect-flash"
import passport from "passport";
import session from "express-session";
import authenticationrouter from "./modules/Authentication/router.js";
import { initialize } from "./helpers/passport.js";
import InstituteRouter from "./modules/Institute/router.js"
import cors from "cors";
dotenv.config();
dbConnect();

const app = express();

app.use(express.json()); // to get the json data
app.use(cors());
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(flash()); // for flashing the messages

// to use the passport 
app.use(passport.initialize());
app.use(passport.session());
initialize(passport);

//routers
app.use("/v1",authenticationrouter);
app.use("/v1/institute",InstituteRouter)

app.listen(process.env.PORT, () => {
  console.log(`app is listening at ${process.env.PORT}`);
});

