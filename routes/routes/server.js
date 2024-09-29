const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions = {
    secret: "mysupersecretstring",
    resave:false,
    saveUninitialized:true,
};

 app.use(session(sessionOptions));
 app.use(flash());


 app.get("./register",(req,res)=>{
    let {name="anonymous"} = req.query;
  // console.log(req.session);
   req.session.name = name;
   if(name==="anonymous"){
    req.flash("error","user not registered user");
   }else{
   req.flash("success","succesully registered user");
   }
   //console.log(req.session.name);
    //res.send(name);
    res.redirect("/hello");
 });

//   app.get("./hello",(req,res)=>{
//    // res.send(`hello,${req.session.name}`);
//      res.render("page.ejs",{name:req.session.name,msg:req.flash("success")});
// });


app.get("./hello",(req,res)=>{
     // res.locals.messages = req.flash("success");
     res.locals.successMsg = req.flash("success");
     res.locals.errorMsg = req.flash("error");
      res.render("page.ejs",{name:req.session.name});
 });


   app.listen(3000,()=>{
    console.log("listening to port 3000");
   });