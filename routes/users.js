const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/users_controller');
const Acreator=require('../schema/creatorInfo');
const dynamicSchema=require('../schema/dynamicCollection');
router.get('/profile',usersController.profile);
router.get('/service',usersController.service);
router.get('/help',usersController.help);
router.get('/books',usersController.books);
router.get('/subscribe',usersController.subscribe);
router.get('/service_create',usersController.service_create);
router.get('/codechef',usersController.codechef);
router.get('/codechefs',usersController.codechefs);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/creates',async(req,res)=>{
    try {
        const channel = req.body.channel.toString().toLowerCase().trim() + '1s';
        const password = req.body.password.toString();
        console.log(channel, password);
        const document = new Acreator({
            channel,
            password
        })
        await document.save();
        dynamicSchema(channel);
        res.status(200).send({ "result": "okk" });
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ "result": 'This name is already taken' });
    }
});
router.post('/create',usersController.create);
 
//use pwd s a middleware to authiticate
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/users/sign-in'},
),usersController.createSession);
  
router.get('/sign-out',usersController.destroySession);
module.exports=router; 
