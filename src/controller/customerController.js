const custModel =require('../model/customerModel');
const uuid=require('uuid');
const validator=require('../utils/validator')

const createCustomer = async (req, res) => {
  try {
    const data=req.body;
    if(!validator.isValidRequestBody(data)){
      return res.status(400).send({status:false,message:"request body is not present"})
    }
    const { firstName, lastName, mobileNumber, DOB, emailID,address, customerID,status } =data;

    if(!firstName){
      return res.status(400).send({status:false,message:"First name is required"})
    }
    if(!validator.isValid(firstName)){
      return res.status(400).send({status:false,message:"First name is invalid"})
    }
    
    if(!lastName){
      return res.status(400).send({status:false,message:"last name is required"})
    }
    if(!validator.isValid(lastName)){
      return res.status(400).send({status:false,message:"last name is invalid"})
    }
    if(!mobileNumber){
      return res.status(400).send({status:false,message:"mobileNumber is required"})
    }
    if(validator.isValid(mobileNumber) || validator.isValidMobileNum(mobileNumber)){
      return res.status(400).send({status:false,message:"Enter valid mobile number"})
    }
    const dobFormat = /^\d{4}-\d{2}-\d{2}$/
    if(!validator.isValid(DOB) || !dobFormat.test(DOB)){
      return res.status(400).send({status:false,message:"DOB is Invalid"})
    }

    if(!emailID){
      return res.status(400).send({status:false,message:"email address is required"})
    }

    if (!validator.isValidEmail(emailID)) {
      return res.status(400).send({ status: false, msg: "You give wrong Email format" });
    }
    const enm=["Active","Inactive"]
    if(!validator.isValid(status) ||!enm.includes(data.status)){
      return res.status(400).send({status : false, message:"enter valid status"})
  }

    
     data.customerID=uuid.v4()

    const customer = await custModel.create(data);
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
    return res.status(404).json({status:false,message:"Active customer doesn't exist"})
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
    const custObjectId=req.params.custId;

    const matchId= await custModel.findOne({customerID:custId,status:"Active"})
    if(!matchId){
      return res.status(400).json({status:false,message:"customer data not found"})
    }
    const deleteId= await custModel.findOneAndUpdate(
      {customerID:custObjectId},
      {$set:{status:"Inactive"}},
      {new:true}
    )
    res.status(200).json({status:true,message:"Deleted"})
  }catch(error){
    res.status(500).send({ status: false, msg: error.message });
  }
}




module.exports={createCustomer,getCustomer,deleteCust}