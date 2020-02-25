const stripe = require("stripe")("sk_test_R7S2YbPU8xHFZ0fMjibHJjCC00MO2NCCLn");
const planModel = require("../model/planmodel");
module.exports.getCheckout = async (req, res) => {
  var id = req.params["id"];
  const plan = await planModel.findById(id);
  console.log(plan);
  // res.end(plan);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        name: `${plan.name}`,
        description: `${plan.description}`,
        images: ["https://image.flaticon.com/icons/svg/184/184567.svg"],
        amount: `${plan.price}00`,
        currency: "usd",
        quantity: 1
      }
    ],
    success_url: "http://localhost/home",
    cancel_url: "https://localhost"
  });
  res
    .status(201)
    .json({ status: "payment for " + plan.name + " made", session: session });
};
