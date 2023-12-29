import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

const SECRET_KEY_ADMIN = "Secrect_key_string_any";


//--------Creating Mongoose Schemas -------
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});

// --------------Define Mongoose Models

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);


// ---------------Connect to MongoDB
// default URI to connect to the test database
// mongoose.connect('mongodb+srv://runtimeTerror:u9LUu5WhKwiDY3xR@cluster0.ngoqydw.mongodb.net/');

mongoose.connect('mongodb+srv://[username]:[password]@cluster0.ngoqydw.mongodb.net/CourseSellingWebsite');


// Authentication Middleware used for all users
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.auth;
    if (authHeader) {
        const token = authHeader.trim().split(" ")[1];
        console.log(token);
        jwt.verify(token, SECRET_KEY_ADMIN, (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(403);
            }
            else {
                req.user = data;
                next();
            }
        });

    }
    else {
        res.status(401).send("UnAuthorized");
    }
}

// ---------- Admin Routes
app.post('/admin/signup', async (req, res, next) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username }); // we have to pass keys that we need to check
    if (admin) {
        res.status(403).send("Admin already Exists with this username");
    } else {
        // saving Document Collection
        // Admin is the variable name of the Data
        const newAdmin = new Admin({ username, password }); // Creating a new Document in the Admin Collection
        await newAdmin.save();

        const token = jwt.sign({ username, password }, SECRET_KEY_ADMIN, { expiresIn: "1h" })
        res.json({ message: 'Admin logged in Successfully', token });
    }
});

app.post("/admin/login", async (req, res, next) => {
    // req.headers is an object we are extracting the username and password propertiys of this object
    const { username, password } = req.headers;
    const admin = await Admin.findOne({ username, password });
    if (admin) {
        const token = jwt.sign({ username, password }, SECRET_KEY_ADMIN, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.sendStatus(404);
    }
});

// User Routes

//Purchasinga  course by the user

app.post("/user/course/:courseid", authenticateJWT, async (req, res) => {
    const username = req.user.username;
    const user = await User.findOne({ username });
    const course = await  Course.findById(req.params.courseid);
    if (course) {
        if(user){
            // we have pointed user variable to our desired user
        // we are pushing the data in the purchasedCourses property
        // we are hence updating the document
        user.purchasedCourses.push(course);
        await user.save();
        }
        else{
            res.status(404).send("user not found");
        }
    }
    else {
        res.sendStatus(404);
    }
})



//Courses Routes

app.get("/admin/course", authenticateJWT, async (req, res) => {
    const course = await Course.find({ published: true }); //will return all the courses
    res.json(course);
})

app.post("/admin/course", authenticateJWT, async (req, res) => {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.send({ message: "Course Created Successfully", courseId: newCourse.id });
});

app.post("/admin/course/:courseid", async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseid, req.body, { new: true });
    if (course) {
        res.send("Course updated Successfully");
    }
    else {
        res.sendStatus(404);
    }
})


app.listen(5000);