const passport=require('passport')
const GoogleStrategy=require('passport-google-oauth20');
const User=require('../models/user-model')
const keys=require('./keys')

passport.serializeUser((user,done)=>{

done(null,user.id);
})

passport.deserializeUser((id,done)=>{
User.findById(id).then(user=>{
done(null,user);	
})

})


passport.use(new GoogleStrategy({
callbackURL: '/auth/google/redirect',
clientID:keys.google.clientID,
clientSecret:keys.google.clientSecret,
 
},(accessToken,refreshToken,profile,done)=>{

User.findOne({googleId:profile.id}).then((currentUser)=>{

if(currentUser){
console.log("user exists");
done(null,currentUser);
}
else{
	new User({
	userName:profile.displayName,
	googleId:profile.id,
	thumbnail:profile._json.picture
}).save()
.then((user)=>{console.log(user);done(null,user); })

}
})
}))