const express=require("express");
const app=express();
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const Redis=require('redis');
const port=80;
const cassandra = require('cassandra-driver');


app.use(express.urlencoded());
app.use(bodyParser.json());

const client = Redis.createClient({
    port: 6881,
    host: "localhost",
  });

// const cass_client = new cassandra.Client({
//   contactPoints: "https://datastax-cluster-config-prod.s3.us-east-2.amazonaws.com/fbc6dbe5-9bac-4474-b8eb-0b3ff9e26e07-1/secure-connect-naruto.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2AIQRQ76S2JCB77W%2F20230925%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20230925T194700Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=69d4c2b13169f2a164474d700c32bfffa501a01a364f3e07ba0a634f8ccd4aa8", 
//   credentials: { username: 'MONISH', password: 'mmonish875' }, 
//   });

// cass_client.connect()
//   .then(() => {
//     console.log('Connected to Cassandra');
//   })


mongoose.connect('mongodb+srv://Monish:mmonish875@minelit.vxryvsw.mongodb.net/test').then(async()=>{
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
    console.log("Redis and MongoDB Connected")
});

const userSchema=new mongoose.Schema({
    text:String
})

const model=mongoose.model("redis",userSchema);

app.get("/",(req,res)=>{
    res.send("Hello World")
});

app.post(("/redis"),async(req,res)=>{
    let values=[req.body.text,req.body.operation];
    switch (values[1]) {
        case "create":
            await client.set('data',values[0])
            break;

        case "read":
            await client.get('data')
            break;

        case "delete":
            await client.del('data')
            break;

        default:
            break;
    }

    setTimeout(async() => {
        switch (values[1]) {
            case "create":
                await model.create({text:values[0]});
                break;
    
            case "read":
                await model.find({text});
                break;
    
            case "delete":
                await model.deleteMany({text:values[0]});
                break;
    
            default:
                break;
        }
    }, 3000);

    res.json({status:"OK"});
});

app.post("/noredis",async(req,res)=>{
    let values=[req.body.text,req.body.operation];

    switch (values[1]) {
        case "create":
            await model.create({text:values[0]});
            break;

        case "read":
            await model.find({text});
            break;

        case "delete":
            await model.deleteMany({text:values[0]});
            break;

        default:
            break;
    }    
    res.json({status:"OK"});
});

app.post("/redisbattle",async(req,res)=>{
    let values=[req.body.text];
    let start_time=[];
    let end_time=[];

    start_time.push(Date.now());
    await client.set('data',values[0]);
    end_time.push(Date.now());

    start_time.push(Date.now());
    await client.get('data');
    end_time.push(Date.now());

    start_time.push(Date.now());
    await client.set('data',values[0]+values[0]);
    end_time.push(Date.now());

    start_time.push(Date.now());
    await client.del('data');
    end_time.push(Date.now());

    
    res.json({status:200,endtime:end_time,starttime:start_time});
});

app.post("/cassandrabattle",async(req,res)=>{

    res.json({status:200,endtime:end_time});
});

app.listen(port,()=>{
    console.log(`Listen to port no: http://localhost:${port}/`);
})