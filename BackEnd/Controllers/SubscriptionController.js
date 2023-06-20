const UsersModel = require("../Models/UsersModel");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


let startSession = async(req,res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price: process.env.PLAN_ID,
            quantity: 1
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.MY_DOMAIN}/paymentSuccessful`,
        cancel_url: `${process.env.MY_DOMAIN}/home`,
     })
      res.status(200).json({session: session.url})
    }catch(err){
        res.status(500).json({msg : err.message})
    }
}

let subscribe = async(req,res)=>{
    try{
        console.log(req.body)
        let id = req.body.id;
        const user = await UsersModel.findById(id);
        if (!user) {
          throw new NotFoundError(`there is no user with this Id : ${id}`);
        }

        user.subscribed = true;
        await user.save();
      res.status(200).json({msg: "Subscribed Successfully"})

    }catch(e){
        res.status(500).json({msg : err.message})
    }
}



module.exports = {
  startSession, subscribe
};