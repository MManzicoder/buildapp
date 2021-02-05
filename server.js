import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import "dotenv/config.js";
import userRoutes from './routes/userRoutes.js';
const app = express();

app.use(cors());
app.use(express.json());

//connecting to database
const PORT = process.env.PORT;
const URL = process.env.URL;
mongoose.connect(URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
})
.then(()=>console.log("Conncted to DB ...."))
.catch(err=>console.log(err.message));

//user routes
app.use("/user", userRoutes);
app.listen(PORT, ()=>console.log(`Listening to port ${PORT} ...`));