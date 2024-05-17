import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://drug-info-and-price-history.p.rapidapi.com/1/druginfo";
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.get("/",(req, res)=>{
    res.render("index.ejs");
});
app.get("/about",(req, res)=>{
    res.render("aboutUs.ejs");
});
app.get("/contect",(req,res)=>{
    res.render("contectUs.ejs");
});
app.post("/submit", async (req, res)=>{
    var name = req.body["mediName"];
    try{
        const response = await axios.get(API_URL,{
            params:{
                drug : req.body["mediName"]
            },
            headers: {
                'X-RapidAPI-Key': 'd8c40080b7msha138fb6d00fff70p1d1829jsn318c011a2a38',
                'X-RapidAPI-Host': 'drug-info-and-price-history.p.rapidapi.com'
              }
        });
        const result = response.data;
        console.log(result);
        res.render("search.ejs",{content: result});
    }catch(error){
        res.render("search.ejs",{error: error});
        console.log(error);
    }
});


app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
});