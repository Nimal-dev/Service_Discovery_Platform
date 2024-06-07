const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    categoryname: {type:String, required: true},


});
const category = mongoose.model("categories", categorySchema);
module.exports = {category};