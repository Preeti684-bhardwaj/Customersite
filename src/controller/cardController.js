const cardModel = require('../model/cardModel');
const custModel = require('../model/customerModel')

const createCard = async function (req, res) {
  try {
    const data = req.body;
    if (!validator.isValidRequestBody(data)) {
      return res.status(400).send({ status: false, message: "request body is not present" })
    }
    const { cardType, customerName, status, vision, customerID } = data

    const enm = ["Regular", "Special"]
    if (!cardType) {
      return res.status(400).send({ status: false, message: "cardType is required" })
    }
    if (!validator.isValid(cardType) || !enm.includes(data.cardType)) {
      return res.status(400).send({ status: false, message: "enter valid cardType" })
    }

    if (!customerName) {
      return res.status(400).send({ status: false, message: "customerName is required" })
    }
    if (!validator.isValid(customerName)) {
      return res.status(400).send({ status: false, message: "customer name is invalid" })
    }

    const statusEnm = ["Active", "Inactive"]
    if (!validator.isValid(status) || !statusEnm.includes(data.status)) {
      return res.status(400).send({ status: false, message: "enter valid status" })
    }
    if (!validator.isValid(vision)) {
      return res.status(400).send({ status: false, message: "Vision is invalid" })
    }
    if (!validator.isValidObjectId(customerID)) {
      return res.status(400).send({
        status: false, message: `${customerID} is not a valid author id`
      });
    }


    const count = await custModel.find().count()
    // console.log(count);
    data.cardNumber = `C00${count}`
    // console.log(data.cardNumber)
    const cardNumExist= await cardModel.findOne({cardNumber:data.cardNumber})
  if(cardNumExist){
    count++
    data.cardNumber= `C00${count}`

  }
    const card = await cardModel.create(data);
    res.status(201).send({ status: true, data: card });
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


module.exports = { createCard, getCardData }