import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';


export const signup= async (req, res, next)=>{


    const {username, email, password} = req.body;

    const hasedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({username, email, password: hasedPassword});
    
    try {
        
        await newUser.save();
        res.status(201).json("USER CREATED SUCESSFULLY");
        
    } catch (error) {

        next(error);
    
    }

}