const mongoose = require("mongoose");
const modelExpense = require("./models/schema");

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/expenses");
}
main()
.then(()=>{
    console.log("connection successful...");
})
.catch(err => console.log(err));

let allExpense = [
    {
        name: "Rent",
        expense: 5300,
        Date: new Date(),
    },
    {
        name: "Food",
        expense: 6000,
        Date: new Date(),
    },
    {
        name: "Water",
        expense: 150,
        Date: new Date(),
    },
    {
        name: "extras",
        expense: 1000,
        Date: new Date(),
    },
];
modelExpense.insertMany(allExpense);