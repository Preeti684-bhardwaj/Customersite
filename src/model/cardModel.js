const mongoose=require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const cardModel = new mongoose.Schema({
  cardNumber: {
    type:String,
    unique:true,
    required:true

},
  cardType: {
    type: String,
    enum:['Regular','Special'],
    required:true
  },
  customerName:{type: String,
    required:true
  },
  status: {
    type: String,
    enum: ["Active","Inactive"],
    default:"Active",
  },
  vision: String,
  customerID: {
    type: ObjectId,
    ref: 'customersList',
    required:true
  }
},{timestamps:true});

module.exports=mongoose.model('cardList',cardModel);