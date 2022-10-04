const User=require('../models/user');


module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:"user/profile"
    });
}

module.exports.service=function(req,res){
    return res.render('user_service'); 
}

module.exports.help=function(req,res){ 
    return res.render('help'); 
}

module.exports.subscribe=function(req,res){ 
    return res.render('subscribe'); 
}

module.exports.service_create=function(req,res){ 
    return res.render('service_create'); 
}




module.exports.codechef=function(req,res){ 
    return res.render('codechef'); 
}

module.exports.books=function(req,res){ 
    return res.render('books'); 
}

module.exports.courses=function(req,res){ 
    return res.render('courses'); 
}

module.exports.codechefs=function(req,res){ 
    return res.render('codechefs'); 
}



//render in sign Up page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render("user_sign_up",{
        title:"Codeal||Sign Up"
    })
}
//render in sign In page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render("user_sign_in",{
        title:"Codeal||Sign In"
    })
}
//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        console.log("here"); 
        return res.redirect('back');
    } 

User.findOne({email:req.body.email},function(err,user){
    if(err){console.log('error in finding user in signing up');
    return; }
    if(!user){
        User.create(req.body,function(err,user){
            if(err){
                console.log('error in creating user while signing Up');
                return}

                return res.redirect('/users/sign-in');
        })
        }else{
            return res.redirect('back');
    }
});
}
//sign in and create seassion for users
 module.exports.createSession=function(req,res){
    return res.redirect('/');
 }

 

 module.exports.destroySession=function(req,res){
    
    req.logout(function(err) {
        if (err) { return next(err); }
        
      });

    return res.redirect('/');
 }