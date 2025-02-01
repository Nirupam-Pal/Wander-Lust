const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isloggedIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/review.js")

//Reviews
//POST route
router.post(
  "/",
  isloggedIn,
  validateReview,
  wrapAsync(reviewController.postReview)
);

//Delete review route
router.delete(
  "/:reviewId",
  isloggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
