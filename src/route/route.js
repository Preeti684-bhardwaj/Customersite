const express=require('express');
const router=express.Router();
const customerCtrl=require('../controller/customerController');
const cardCtrl=require('../controller/cardController');


router.post('/customer',customerCtrl.createCustomer);
router.post('/card',cardCtrl.createCard);
router.get('/customerlist',customerCtrl.getCustomer);
router.get('/cardlist',cardCtrl.getCardData);
router.delete('/customer/:id',customerCtrl.deleteCust);

router.use("*", (req, res) => {
    return res.status(404).send("invalid urls");
});

module.exports= router