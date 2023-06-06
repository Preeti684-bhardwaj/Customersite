const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const route=require('./route/route.js');
 
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://bhardwajpreeti684:k7qOsqSx0AAnGDWv@cluster0.cwtrept.mongodb.net/bonusproject01-DB",{useNewUrlParser:true})
  .then(()=>console.log("MongoDB is connected"))
  .catch(err=>console.log(err))

  app.use('/',route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
