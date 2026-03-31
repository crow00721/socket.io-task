const Payment = require("../models/payment");
const { encrypt, decrypt } = require("../middlewares/encryption");

// Create Payment
exports.createPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount, paymentMethod, transactionId } = req.body;

    const payment = await Payment.create({
      userId,
      amount,
      paymentMethod: encrypt(paymentMethod),
      transactionId: encrypt(transactionId),
    });

    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Aggregation
exports.getPaymentsWithUser = async (req, res) => {
  try {
    const data = await Payment.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ]);

    const decrypted = data.map((p) => ({
      ...p,
      paymentMethod: decrypt(p.paymentMethod),
      transactionId: decrypt(p.transactionId),
    }));

    res.json(decrypted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};