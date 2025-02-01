const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isloggedIn, isOwner, validateListing } = require("../middleware.js");

//controllers
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isloggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );
//New Route
router.get("/new", isloggedIn, listingController.renderNewForm);

//Update route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isloggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isloggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isloggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;

//Index Route
// router.get("/", wrapAsync(listingController.index));

//Show Route
// router.get("/:id", wrapAsync(listingController.showListing));

//Create route
// router.post(
//   "/",
//   isloggedIn,
//   validateListing,
//   wrapAsync(listingController.createListing)
// );

//Update Route
// router.put(
//   "/:id",
//   isloggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(listingController.updateListing)
// );

//Delete route
// router.delete(
//   "/:id",
//   isloggedIn,
//   isOwner,
//   wrapAsync(listingController.destroyListing)
// );
