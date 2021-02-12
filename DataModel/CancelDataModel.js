let mongooseObj = require("mongoose");

mongooseObj.connect("mongodb://127.0.0.1/ecommercedb");

let Schema = mongooseObj.Schema;

let CancelSchema = new Schema(
    {
        userid : { type: String, required: true },
        cart : Object,
        date : String
    },
    {
        versionKey: false
    }
)

let CancelDataModel = mongooseObj.model('cancel', CancelSchema);

module.exports = CancelDataModel; 