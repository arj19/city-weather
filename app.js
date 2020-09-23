const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/",function(req,res){
    const query = req.body.city;
    const apiKey = "86fe83287069cffa657ac48e3e755f58";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherData =  JSON.parse(data);
            res.write("<h1>The temperature at "+query+" is: "+weatherData.main.temp+"</h1>");
            res.write("<h2>weather is : "+weatherData.weather[0].description+"</h2>");
            const imgSrc = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            res.write("<img src = "+imgSrc+">");
            res.send();
        })
    })
});

app.listen(3000,function(){
    console.log("server live at port 3000");
});