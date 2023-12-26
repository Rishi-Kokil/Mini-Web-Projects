import express, { Router } from "express";
import jwt from "jsonwebtoken";


//Creating a temporary Admin Database in the form of an Array
const ADMIN = []; //empty array
const SECRET_KEY_ADMIN = "Random_String";

const adminRouter = express.Router();
adminRouter.use(express.json()); //extract http post request payload in the form of json in the req.body 

//Admin Auhtentication middleware
const adminAuthentication = (req, res, next) => {
    console.log(ADMIN);
    const token = req.headers.token;
    jwt.verify(token, SECRET_KEY_ADMIN, (err, user) => {
        if (err) {
            res.status(403).send("unauthorized");
        }
        else {
            req.user = user;
            next();
        }
    })
};

adminRouter.get('/', (req, res, next) => {
    res.json(ADMIN);
});
// Admin will login or else admin will signup
adminRouter.post("/signup", (req, res, next) => {
    const { username, password } = req.body;
    const userExists = ADMIN.some((object) => object.username === username);

    if (userExists) {
        // User already exists, send a 403 response
        return res.status(403).send("User already exists");
    }

    //generate a JWT
    const token = jwt.sign({username , password}, SECRET_KEY_ADMIN , {expiresIn : '1h'})

    // User does not exist, add to the ADMIN array
    ADMIN.push({ username, password });
    // Optionally, you can send a success response
    res.send(`User created successfully with token : ${token}`);

});

adminRouter.post("/login", adminAuthentication, (req, res, next) => {
    res.status(200).send('Logged in Successfully');
})

// adminRouter.put();
// adminRouter.delete();

export default adminRouter;