const express= require("express");
const bodyparser= require("body-parser");
const request = require("request")
const https= require("https")
const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstname= req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;

    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname, LNAME: lastname
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    // console.log(firstname,lastname,email);
   
    const url= "https://us14.api.mailchimp.com/3.0/lists/ccce1a9cfc"
    
    const options={
        method: "POST",
        auth: "prerna:05a5d153cef3c5b665328abebe04b1d8-us14"
    }
    const request=https.request(url,options, function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })  
    request.write(jsonData);
    request.end();
});
app.post("/failure.html",function (req,res) {
    res.redirect("/")
  })
app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on Port 3000");
});
//API KEY
// 05a5d153cef3c5b665328abebe04b1d8-us14
//Audience Id
//ccce1a9cfc