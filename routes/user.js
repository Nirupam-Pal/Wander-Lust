const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js")

//route for signup
router.route("/signup")
.get(userController.renderSignupForm)
.post(
  wrapAsync(userController.signupUser)
);

//route for login
router.route("/login")
.get(userController.renderLoginForm)
.post(
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.loginUser
);

//route for logout
router.get("/logout", userController.logoutUser);

module.exports = router;

//render signup form
// router.get("/signup",userController.renderSignupForm );

//route for signup
// router.post(
//   "/signup",
//   wrapAsync(userController.signupUser)
// );

// router.get("/login", userController.renderLoginForm);

//route for login
// router.post(
//   "/login",
//   savedRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   userController.loginUser
// );
