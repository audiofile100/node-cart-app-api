let mongooseObj = require("mongoose");
let schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/ecommercedb");

let ProductSchema = new schemaObj (
    {
        name:{type: String, required: true},
        price:String,
        camera:String,
        ram:String,
        display:String,
        color:String
    },
    {
        versionKey: false //false - set to false then it wont create in mongodb
    }
);

let ProductDataModel = mongooseObj.model("product", ProductSchema);

module.exports = ProductDataModel;