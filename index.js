const express=require('express'); 
const cookieParser=require('cookie-parser');  
const path = require('path');
const app=express(); 
const port=8000;  
const leetcode=require('./dataUpdate/leetcode');
const codeforces=require('./dataUpdate/codeforces');
const codechef=require('./dataUpdate/codechef');
const atcoder=require('./dataUpdate/atcoder');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');  
//used for session cookie and autheication passport
const session=require( 'express-session' ) ; 
const passport = require ('passport') ;  
const passportLocal = require( './config/passport-local-strategy');
const MongoStore=require('connect-mongo');  

app.use(express.urlencoded({extended:false}));

app.use(cookieParser());
app.use(express.static('./assets'));
 
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true); 
app.set('layout extractScripts',true);
 


//set up view engine
app.set('view engine','ejs');
app.set('views','./views'); 


// mongo store is used to store session cookie in the db
app.use(session({
   name:'codeial', 
   secret:"something",
   resave:false,
   saveUnitializes:false,
   cookie:{maxAge:(1000*60*100)   
},
store:new MongoStore(
    {
        mongoUrl:'mongodb://localhost/codeial_development',
        autoRemove:'disabled'
    },
    function(err){
        console.log(err||'connect-mongodb setup ok');
    }
)
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//use express router



app.use('/codeforces',(req,res)=>{
     
    return res.sendFile(path.join(__dirname,'./assets/codeforces/codeforces.html')); 
})

app.use('/codechef',(req,res)=>{
 
    return res.sendFile(path.join(__dirname,'./assets/codechef/codechef.html')); 
})


app.use('/leetcode',(req,res)=>{
    
    return res.sendFile(path.join(__dirname,'./assets/leetcode/leetcode.html')); 
})

app.use('/atcoder',(req,res)=>{
   
    return res.sendFile(path.join(__dirname,'./assets/atcoder/atcoder.html')); 
})

app.use('/books',(req,res)=>{
     
    return res.sendFile(path.join(__dirname,'./assets/books/books.html')); 
})


app.use('/',require('./routes'));
setInterval(() => {
    leetcode();
    codechef();
 codeforces();
    atcoder();

}, 180000);


app.listen(port,function(err){
    if(err){
        //console.log('error',err);
        console.log(`error: ${err}`);
    }
    console.log(`server is running: ${port}`);
});