let mongooseObj = require("mongoose");
let schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/ecommercedb", { useNewUrlParser: true, useUnifiedTopology: true });

let ReviewSchema = new schemaObj({
    productid: {type:String, required:true},
    userid: String,
    title: String,
    review: String,
    rating: String
},
{
    versionKey: false
});

let ReviewDataModel = mongooseObj.model("review", ReviewSchema);

module.exports = ReviewDataModel;