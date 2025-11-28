if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


//Routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

main()
.then(() => {
  console.log("Connected to db");
})
.catch((err) => {
  console.log(err);
});

async function main() {
  try {
    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      retryWrites: true,
      w: 'majority'
    });
  } catch (err) {
    console.log("MongoDB connection error:", err);
    // Don't throw - let the app start even if DB connection fails
    // The connection will retry on next request
  }
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err)=>{
  console.log("Error in Mongo session store", err);
})

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //7 days
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};

// app.get("/", (req, res) => {
//   res.send("Hi I am root");
// });



app.use(session(sessionOptions));
app.use(flash());

//Implimenting passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

//serializing is storing user's info into the sessions and deserialize means to remove the info from session (Logout)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next)=>{
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  res.locals.currUser = req.user || null;
  next();
})

//storing a demo user into the database
// app.use("/demouser", async (req, res)=>{
//   let fakeuser = new User({
//     email: "user@gmail.com",
//     username: "FaakeUser",
//   });

//   let registeredUser = await User.register(fakeuser, "password");
//   res.send(registeredUser);
// })

app.use("/listings", listingRouter)
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",  userRouter);


app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

//Middleware for error handling
app.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured" } = err;
  // Ensure currUser is available in error pages
  if (!res.locals.currUser) {
    res.locals.currUser = req.user || null;
  }
  //res.status(status).send(message);
  res.status(status).render("error.ejs", { message });
});

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});

