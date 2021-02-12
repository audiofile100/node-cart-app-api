let mongooseObj = require("mongoose");

mongooseObj.connect("mongodb://127.0.0.1/ecommercedb");

let Schema = mongooseObj.Schema;

let OrderSchema = new Schema(
    {
        userid : { type: String, required: true },
        cart : Object,
        date : String
    },
    {
        versionKey: false
    }
)

let OrderDataModel = mongooseObj.model('order', OrderSchema);

module.exports = OrderDataModel;