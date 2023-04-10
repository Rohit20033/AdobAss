const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    user_id: {type: "String",
    ref: 'User'},
    content: {
        type: String,
        required: true,
        min: 1,
        max: 300},
      created_at: {
        type: Date,
        default: Date.now},
      updated_at: {
        type: Date,
        default: Date.now},
      likes: {
        type: Number,
        min: 0,
        default: 0}
    
})

const postModal = mongoose.model("post",postSchema)

module.exports = {postModal}