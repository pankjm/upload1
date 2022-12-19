const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");


 const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

 app.get("/",function(req,res){
   res.sendFile(__dirname + "/signup.html");
 });

 app.post("/",function(req,res){
   const firstName=req.body.fName;
   const  secondName=req.body.lName;
   const email=req.body.email;

const data={
  members:[
    {
    email_address:email,
    status:"subscribed",
    merge_fields:{
        FNAME:firstName,
        LNAME:secondName
    }
    }
  ]
};

const jsonData= JSON.stringify(data);

const url="https://us21.api.mailchimp.com/3.0/lists/829a1a1fd7";

const options={
  method:"POST",
  auth:"pankaj1:9653e2db30d24daffc961b1cd12b7529-us21"
}

   const request=https.request(url,options,function(response){
     if(response.statusCode===200){
       res.sendFile(__dirname + "/success.html");
     }
     else{
       res.sendFile(__dirname + "/failure.html");
     }

     response.on("data",function(data){
       console.log( JSON.parse(data));
     })
   })

   request.write(jsonData);
   request.end();


 });

 app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
 });


 //apikey:05e37e901e8e4fafac20296280fe5fe3-us21
 //list id:829a1a1fd7A
