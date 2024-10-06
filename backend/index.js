import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import { Item } from "./Models/itemModel.js";

const app = express();

//ensure backend is up and running
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

//route default http request
app.get('/', (req, res)=>{
    console.log(req);
    return res.status(200).send("welcome to LostnFound!");
})

//connect the database
mongoose
    .connect(mongoDBURL)
    .then(() =>{
        console.log("connected to database");
        app.listen(PORT, () =>{
            console.log(`Server listening on port ${PORT}`);
        })
    })
    .catch((error) =>{
        console.log(error);
    })