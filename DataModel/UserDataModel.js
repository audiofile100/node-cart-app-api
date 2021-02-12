let mongooseObj = require("mongoose");
let schemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/ecommercedb", { useNewUrlParser: true, useUnifiedTopology: true });

let UserSchema = new schemaObj({
    userName: {type:String, required:true},
    password: {type:String, required:true},
    street: String,
    mobile: String
},
{
    versionKey: false
});

let UserModel = mongooseObj.model("user", UserSchema);

module.exports = UserModel;