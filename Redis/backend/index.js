const express= require('express');
const app=express();
const port=80;

app.use(express.urlencoded());
app.get('/',(req,res)=>{
    res.send("Hey There")
});

app.listen(port,()=>{
    console.log(`Listen to port no : http://localhost:${port}`);
})