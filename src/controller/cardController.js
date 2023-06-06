const cardModel=require('../model/cardModel');
const custModel=require('../model/customerModel')

const createCard=async function (req, res) {
  try {
        const data = req.body;
        const {cardType,customerName,status,vision,customerID}=data
        const count = await custModel.find().count()
        // console.log(count);
        data.cardNumber = `C00${count}`
        console.log(data.cardNumber)
        
       const card = await cardModel.create(data);
       res.status(201).send({ status: true, data: card});
  } catch (error) {
    res.status(400).send({ status: false, msg: error.message });
  }
};


const getCardData = async (req, res) => {
  try {
    let cardList = await cardModel.find();
    if (cardList.length == 0) {
      return res.status(404).send({ status: false, msg: " no cards found" });
    }
    res.status(200).send({ status: true, msg: cardList });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


module.exports={createCard,getCardData}