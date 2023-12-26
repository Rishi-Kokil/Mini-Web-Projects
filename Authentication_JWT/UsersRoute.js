

//Without JWT token Authentication
// Dumb Approach



import express, { Router } from "express";




//Creating a temporary Admin Database in the form of an Array
const USERS = []; //empty array


const userRouter = express.Router();
userRouter.use(express.json()); //extract http post request payload in the form of json in the req.body 

//Admin Auhtentication middleware
const userAuthentication = (req , res ,next)=>{
    console.log(USERS);
    const username = req.headers.username;
    const password = req.headers.password;
    console.log( "value in haeders", username , password);

    if(USERS.some((object)=>(object.username === username && object.password === password))){
        next();
    }
    else{res.status(403).send('Invalid USername or password');}
};


userRouter.get('/' , (req , res , next)=>{
    res.json(ADMIN);
});

// clearImmediate
 // Admin will login or else admin will signup
 userRouter.post("/signup", (req, res, next) => {
    const { username, password } = req.body;
    const userExists = ADMIN.some((object) => object.username === username);

    if (userExists) {
        // User already exists, send a 403 response
        return res.status(403).send("User already exists");
    }

    // User does not exist, add to the ADMIN array
    ADMIN.push({ username, password });

    // Optionally, you can send a success response
    res.status(201).send("User created successfully");
});

userRouter.post("/login" , userAuthentication , (req ,res,next)=>{
    res.status(200).send('Logged in Successfully');
})

// userRouter.put();
// userRouter.delete();

export default userRouter;