const custModel =require('../model/customerModel');
const uuid=require('uuid')

const createCustomer = async (req, res) => {
  try {
    const data=req.body;
    if(!Object.keys(data).length > 0){
      return res.status(400).send({status:false,message:"request body is not present"})
    }
    const { firstName, lastName, mobileNumber, DOB, emailID,address, customerID,status } =req.body;

    if(!firstName){
      return res.status(400).send({status:false,message:"First name is required"})
    }
    if(!lastName){
      return res.status(400).send({status:false,message:"last name is required"})
    }
    if(!mobileNumber){
      return res.status(400).send({status:false,message:"mobileNumber is required"})
    }
    if(mobileNumber>10 || mobileNumber<10){
      return res.status(400).send({status:false,message:"mobile no. must be 10-digits long"})
    }
    if(!DOB){
      return res.status(400).send({status:false,message:"DOB is required"})
    }
    if(!emailID){
      return res.status(400).send({status:false,message:"email address is required"})
    }
    const email = req.body.emailID;

    const pattern =/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const found = email.match(pattern);
    if (!found) {
      return res.status(400).send({ status: false, msg: "You give wrong Email format" });
    }

    let matchData = {firstName:firstName, lastName: lastName, mobileNumber:mobileNumber, DOB: DOB, emailID:emailID,address:address, customerID:customerID,status:status};
     data.customerID=uuid.v4()

    const customer = await custModel.create(matchData);
    res.status(201).send({ status: true, data: customer });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, msg: error.message });
  }
};
const getCustomer= async (req,res)=>{
  try{
  let findCust = await custModel.find({status:"Active"});
  if(!findCust){
    return res.status(404).json({status:false,message:"customer doesn't exist"})
  }
  res.status(200).json({status:true,data:findCust});
  }
  catch(error){
    console.log(error)
    res.status(500).send({ status: false, msg: error.message });
  }
};

const deleteCust= async (req,res)=>{
  try{
    const custObjectId=req.params.id;
    if(!custObjectId){
      return res.status(400).json({status:false,message:"id is required"})
    }
    const deleteId= await custModel.findOneAndUpdate(
      {_id:custObjectId},
      {$set:{status:"Inactive"}},
      {new:true}
    )
    res.status(200).json({status:true,message:"Deleted"})
  }catch(error){
    res.status(500).send({ status: false, msg: error.message });
  }
}




module.exports={createCustomer,getCustomer,deleteCust}