import express, { response } from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));


app.get("/", async (req,res)=>{
    try{
    const result = await axios.get("https://http.cat/200.jpg", {responseType: "arraybuffer", });
    const base64Image = Buffer.from(result.data, "binary").toString("base64");
    const imageSource = `data:image/jpeg;base64,${base64Image}`;
    res.render("index.ejs", {image: imageSource});
    } catch(error){
        console.log(error)
        res.status(500).send("Error fetching image")
    }
});


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});