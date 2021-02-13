let express = require("express");
let router = express.Router();

let UserModel = require("../DataModel/UserDataModel");
let HobbyModel = require("../DataModel/HobbyDataModel");
let ProductModel = require("../DataModel/ProductDataModel");
let CartModel = require("../DataModel/CartDataModel");
let OrderModel = require("../DataModel/OrderDataModel");
let CancelModel = require("../DataModel/CancelDataModel");
let ReviewModel = require("../DataModel/ReviewDataModel");

router.post("/api/signInUpUser", (req, res) => {
    console.log(req.body);

    UserModel.findOne({userName: req.body.userName}, (err, userObject) => { //error first callback
        if (err != null) { //if error occurs at the time of user object search
            console.log("Error :", err);
            res.send({"Err":err});
        } else if (userObject) { //user already exists - sign in
            res.json(userObject);
        } else{            
            let signObjForMongo = new UserModel(req.body); //auto assigns value to

            signObjForMongo.save((err, data, next)=>{//data : the same user object that saved and contains mongodb id
                if (err) {
                    res.send("Error Occurred While Siging User "+ err);
                } else{     
                    res.json(data);
                }
            });
        }
    });
});

// hobbies api
router.post("/api/addHobby", (req, res)=>{

    let hobbiesObj = new HobbyModel(req.body);

    hobbiesObj.save((err,data,next)=>{
        if (err) {
            res.send("error occured" + err);
        }
        res.json(data);
    });
});

router.get("/api/getHobbies", (req, res) => {
    HobbyModel.find((err, data, next) => {
        console.log("Data: ", data);

        err ? 
        res.send({"error": err}) 
        :
        res.send(data);
    });
});

// product api
router.post("/api/saveProduct",(req, res)=>{
    
    let productObj = new ProductModel(req.body);

    productObj.save((err, data, next)=>{        
        if (err) {
            res.send("Error Occurred"+ err);
        }      
        res.json(data);
    });
});

router.get("/api/getProducts",(req, res)=>{
    ProductModel.find((err, data, next) =>{
        console.log("Data :", err);

        err ? 
        res.send({"error": err}) 
        :
        res.send(data)
    })
});

//cart api's
router.post("/api/saveUserCart",(req, res)=>{

    CartModel.findOne({userid: req.body.userid},(err, cartDbObj) => {
        console.log("We Found One - ",cartDbObj);
        if (err){
            console.log("got an error!");            
            res.send(err);
        }
        if (!cartDbObj) { //checks for null cart of given user
          console.log("No cartitems Present, Adding / Inserting!"); 
          let cartObj = new CartModel(req.body);
          cartObj.save((err, data, next)=>{        
            if (err) {
                res.send("Error Occurred"+ err);
            }      
            res.json(data);
          });
        }else{
          console.log("CartItems Present, Replacing / Updating!");
          cartDbObj.cart = req.body.cart
          cartDbObj.save((err, data, next)=>{        
            if (err) {
                res.send("Error Occurred"+ err);
            }      
            res.json(data);
          });
        }
  });
});

router.post("/api/getUserCart",(req, res)=>{
    CartModel.findOne({userid: req.body.userid},(err, cart) => {         
        if (err) {
            res.send("Error Occurred"+ err);
        }      
        res.json(cart);
      });
});

// order api's
router.post("/api/saveOrder", (req, res) => {

    let orderObj = new OrderModel(req.body);

    orderObj.save((err, data, next) => {
        if (err) {
            res.send("error " + err);
        }
        res.json(data);
    });
});

router.get("/api/getOrders", (req, res) => {

    OrderModel.find((err, data, next) => {
        console.log("Data: ", data);

        err ? 
        res.send({"error": err}) 
        :
        res.send(data);
    });
});

router.delete("/api/removeOrder/:id", (req, res) => {
    
    OrderModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.send("error findByIdAndRemove: " + err);
        }
        res.send("deleted ");
    });
});

// cancel api
router.post("/api/saveCancel", (req, res) => {

    let cancelObj = new CancelModel(req.body);

    cancelObj.save((err, data, next) => {
        if (err) {
            res.send("error " + err);
        }
        res.json(data);
    });
});

router.get("/api/getCancels", (req, res) => {

    CancelModel.find((err, data, next) => {
        console.log("Data: ", data);

        err ? 
        res.send({"error": err}) 
        :
        res.send(data);
    });
});

router.delete("/api/removeCancel/:id", (req, res) => {

    CancelModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.send("error findByIdAndRemove: " + err);
        }
        res.send("deleted ");
    });
});

router.post("/api/addCancel", (req, res) => {

    let orderObj = new OrderModel(req.body);

    orderObj.save((err, data, next) => {
        if (err) {
            res.send("error " + err);
        }
        res.json(data);
    });
});

// review api
router.post("/api/saveReview", (req, res) => {

    let reviewObj = new ReviewModel(req.body);
    
    reviewObj.save((err, data, next) => {
        if (err) {
            res.send("error " + err);
        }
        res.json(data);
    });
});

// router.get("/api/getReviews/:id", (req, res) => {
    
//     ReviewModel.find({'productid': req.params.id}, function (err, result) {
//         console.log("RESULT ", req.params.id);
//         err ? 
//         res.send({"error": err}) 
//         :
//         res.send(result);
//     });
// });

router.get("/api/getReviews", (req, res) => {

    ReviewModel.find((err, data, next) => {
        console.log("Data: ", data);

        err ? 
        res.send({"error": err}) 
        :
        res.send(data);
    });
});

module.exports = router