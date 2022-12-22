import { application, Router } from "express";
import { sample_users } from "../data";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";
import asynchandler from 'express-async-handler';
import { HTTP_BAD_REQUEST,HTTP_UNAUTHORIZED} from "../constants/http-status";

import bcrypt from 'bcryptjs';

const router = Router();

router.get("/seed", asynchandler (
    async (req,res)=> {
        const usersCount = await UserModel.countDocuments();
        if (usersCount > 0){
            res.send("Seed is already done!");
            return;
        }
        await UserModel.create(sample_users);
        res.send("Seed is done!")
    
}))

router.post("/login",asynchandler(
    async(req,res)=>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    
    if(user && (await bcrypt.compare(password, user.password))){
        res.send(generateUserToken(user));
    } else{
        //const BAD_REQUEST = 400;
        res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!! ")
    }
}))

// router.post("/login",(req,res)=>{
//     const {email,password} = req.body;
//     const user = sample_users.find(user => user.email === email && user.password=== password)
//     if(user){
//         res.send(generateUserToken(user));
//     } else{
//         //const BAD_REQUEST = 400;
//         res.status(400).send("Username or password is invalid!! ")
//     }
// })

router.post('/register', asynchandler(
    async(req, res) => {
   const {name, email,password,address} = req.body;
   const user = await UserModel.findOne({email});
        if(user) {
            res.status(HTTP_UNAUTHORIZED)
            .send("User Already exist, Please login!");
            return;
        }
    const encryptPassword = await bcrypt.hash(password,10);
    const newUser:User = {
        id:'',
        name,
        email: email.toLowerCase(),
        password:encryptPassword,
        address,
        isAdmin:false
    }
    const dbUser =await UserModel.create(newUser);
    res.send(generateUserToken(dbUser));
}
))

const generateUserToken =(user:User) =>{
    const token = jwt.sign({
        id: user.id, 
        email:user.email,
        isAdmin:user.isAdmin
    },"SomeRandomKey",{
        expiresIn:'30d'});

    return { 
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token};
} 

export default router;

