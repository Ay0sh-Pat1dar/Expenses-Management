const express = require("express");
const mongoose = require("mongoose");
const modelExpense = require("./models/schema");
const app = express();
const methodOverride = require('method-override');


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


main()
.then(()=>{
    console.log("connection successful...");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/expenses');
}

app.listen(3000, ()=>{
    console.log("app is listening...");
});

app.get("/", async(req,res)=>{
  let allExpense = await modelExpense.find();
  res.render("home.ejs", {allExpense});
});

app.get("/show", async (req,res)=>{
  let allExpense = await modelExpense.find();
  // console.log(allExpense);
  res.render("show.ejs", {allExpense});
});

app.get("/new", (req,res)=>{
  res.render("new.ejs");
});

app.post("/new", (req,res)=>{
  let {name, expense} = req.body;
  let ex = new modelExpense({
    name: name,
    expense: expense,
    Date: new Date(),
  });
  ex.save();
  res.redirect("/");
});

app.get("/edit/:id", async (req,res)=>{
  let {id} = req.params;
  let expenses = await modelExpense.findById(id);
  // console.log(expenses);
  res.render("edit.ejs", {expenses});
});

app.patch("/edit/:id", async(req,res)=>{
  let {id} = req.params;
  let {name:newName, expense:updEx} = req.body;
  await modelExpense.findByIdAndUpdate(id, {name: newName, expense: updEx, Date: new Date()}, {runValidators:true, new:true})
  .then(res=>{console.log(res)});
  res.redirect("/show");
});

app.get("/delete/:id", async (req,res)=>{
  let {id} = req.params;
  let expenses = await modelExpense.findById(id);
  // console.log(expenses);
  res.render("delete.ejs", {expenses});
});

app.delete("/delete/:id", async(req,res)=>{
  let {id} = req.params;
  await modelExpense.findByIdAndDelete(id);
  res.redirect("/show");
});
