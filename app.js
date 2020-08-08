const express=require('express')
const authRoute=require('./routes/auth-router')
const passportSetUp=require('./config/passport-setup')
const keys=require('./config/keys')
const mongoose=require('mongoose')
const passport=require('passport')
const cookieSession=require('cookie-session')
const profileRoute=require('./routes/profile')
const app=express()


app.set('view engine','ejs');

app.use(cookieSession({
maxAge:24*60*60*1000,
keys:[keys.session.cookieKey]

}));


app.use(passport.initialize());
app.use(passport.session())



mongoose.connect(keys.mongoDb.url,{useNewUrlParser:true,useUnifiedTopology:true},()=>console.log("connected"));

app.use('/auth',authRoute);
app.use('/profile',profileRoute)
app.get('/',(req,res)=>{

	res.render('home',{user:req.user})
})

app.listen(3001,()=>{

console.log("server started")

})