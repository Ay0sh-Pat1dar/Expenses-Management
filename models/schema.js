const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    expense:{
        type: Number,
        required:true,
    },
    Date:{
        type: Date,
        required:true,
    },
});

const modelExpense = mongoose.model("modelExpense", expenseSchema);

module.exports = modelExpense;