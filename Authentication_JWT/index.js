//Login Backend

import express from "express";
import adminRouter from "./AdminRoute.js";
import userRouter from "./UsersRoute.js";


const app = express();



app.use("/admin" , adminRouter);
app.use("/user" , userRouter);

app.listen(5000);

