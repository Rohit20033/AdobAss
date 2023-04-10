const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{type:String,min:1,max: 50},
    email:{type:String},
    bio:{type:String,max:200},
    created_at: { type: Date,default: Date.now},
    updated_at:{ type: Date, default: Date.now}
})

const userModal = mongoose.model("user",userSchema)

module.exports = {userModal}