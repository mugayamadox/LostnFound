import express from "express";
import {PORT} from "./config.js";

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