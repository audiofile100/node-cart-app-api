let mongooseObj = require("mongoose");
let schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/ecommercedb", { useNewUrlParser: true, useUnifiedTopology: true });

let HobbySchema = new schemaObj(
    {
        name: { type: String, required: true }
    },
    {
        versionKey: false
    }
)

let HobbyDataModel = mongooseObj.model("hobby", HobbySchema);

module.exports = HobbyDataModel;