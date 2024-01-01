import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcrypt';

const app = express();

app.use(express.json());
app.use(cors());


//Salting the password to store it in database
const saltRounds = 3;

//function that returns hashed password

const hashPassword = (plain_password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(plain_password, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(hash);
            }
        });

    });
}

const hashVerify = (entered_password, storedHash) => {

    return new Promise((resolve, reject) => {
        bcrypt.compare(entered_password, storedHash, (err, result) => {
            if (err) {
                reject(new Error("Error comparing password"));
            }
            else {
                if (result) {
                    resolve(true);
                }
                else {
                    resolve(false)
                }
            }
        })

    });
}



//two seperate secreat key for admin and user
const SECRECT_ADMIN_KEY = "AD2024MINPROJ";
const SECRECT_USER_KEY = "US2024ERPROJ";


const authenticateAdmin = (req, res, next) => {
    const header = req.headers;
    const token = header.authorization.split(" ")[1];

    jwt.verify(token, SECRECT_ADMIN_KEY, (err, data) => {
        if (err) {
            res.status(403).send("Unauthorised")
        }
        else {
            req.user = data;
            next();
        }

    })
}

const authenticateUser = (req, res, next) => {
    const header = req.headers;
    const token = header.authorization.spilt(" ")[1];

    jwt.verify(token, SECRECT_ADMIN_KEY, (err, data) => {
        if (err) {
            res.status(403).send("Unauthorised")
        }
        else {
            req.user = data;
            next();
        }

    })
}

//Database Configurations

//---------Schemas
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});


//mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);

//connection string
mongoose.connect("mongodb+srv://runtimeTerror:u9LUu5WhKwiDY3xR@cluster0.ngoqydw.mongodb.net/Login_Signup");


//Admin Routes

app.get("/admin", authenticateAdmin, async (req, res) => {
    const { username, password } = req.user;
    //retirveing all admins
    const allAdmims = await Admin.find({});
    res.json(allAdmims);
})

app.post("/admin/signup", async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
        res.status(401).send("Admin with this username already exists");
    }
    else {
        //salting the password
        try {
            const newhash = await hashPassword(password);
            console.log(newhash);
            //create a jwt toekn and send it to the frontend
            if (newhash) {
                const token = jwt.sign({ username, 'password': newhash }, SECRECT_ADMIN_KEY, { expiresIn: '10h' });

                const newAdmin = new Admin({ username, 'password': newhash });
                newAdmin.save();
                res.json({ message: "Admin Added Succesfully", token });
            }
            else {
                res.send("Invalid Password")
            }

        } catch (error) {
            res.status(401).send(error.message);
        }
    }
})

app.post("/admin/login", async (req, res) => {
    const { username, password } = req.body;
    const hashedpassword = await hashPassword(password);

    const admin = await Admin.findOne({ username });
    if (admin) {
        const isPasswordValid = await hashVerify(password, admin.password);
        if (isPasswordValid) {
            const token = jwt.sign({ username, 'password': admin.password }, SECRECT_ADMIN_KEY, { expiresIn: '1h' });
            res.json({ message: "User Logged in successfully", token });
        } else {
            res.status(401).send("Invalid Password");
        }
    } else {
        res.status(404).send("Admin not found");
    }

})

//User Routes



//server
app.listen(5000, () => {
    console.log("Running on port 5000");
})