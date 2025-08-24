import express from 'express'

const app=express();

const port=process.env.PORT || 5000;

app.get("/",(req,res)=>{
    console.log("shubham");
    res.send("hii here");
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
