const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const auth = require("../middlewares/auth");

router.post("/", auth, paymentController.createPayment);
router.get("/with-user", auth, paymentController.getPaymentsWithUser);

module.exports = router;