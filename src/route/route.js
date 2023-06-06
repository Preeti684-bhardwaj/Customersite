const express=require('express');
const router=express.Router();
const customerCtrl=require('../controller/customerController');
const cardCtrl=require('../controller/cardController');
const middleware=require('../middleware/middleware')

router.post('/customer',middleware.uniqueEmail,customerCtrl.createCustomer);
router.post('/card',cardCtrl.createCard);
router.get('/customerlist',customerCtrl.getCustomer);
router.get('/cardlist',cardCtrl.getCardData);
router.delete('/customer/:id',customerCtrl.deleteCust)

module.exports= router