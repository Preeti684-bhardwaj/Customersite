const custModel=require('../model/customerModel');
const cardModel=require('../model/cardModel');


const uniqueEmail = async function (req, res, next) {
  try {
    const uEmail = req.body.emailID;
    let checkEmail = await custModel.findOne({ emailID: uEmail });
    if (checkEmail) {
      return res.status(401).send({ status: false, msg: "emailId already exist" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const validMobNum=async function(req,res,next){
    try{
        const mobNum=req.body.mobileNumber;
    if (!mobNum)
      return res.status(400).send({ status: false, message: "mobileNumber is required" });
     next();
    }
    catch(err){
      console.log(err)
        res.status(500).send({status:false,error:err.message})
    }
}

module.exports = {uniqueEmail, validMobNum };