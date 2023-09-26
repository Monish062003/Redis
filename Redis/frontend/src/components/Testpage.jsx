import React,{useState,useEffect} from 'react'
import '../css/test.css'
import Docker from "../img/docker.png"
import Redis from "../img/redis.png"
import Mongo from "../img/pngegg.png"
import Node from "../img/nodejs.png"
import Upload from "../img/upload.png"
import Dion from "../img/sad.gif"
import Dionh from "../img/happy.gif"
import neutral from "../img/neutral.jpeg"
import Swords from "../img/swords.png"

export default function Testpage() {
 
  const[file,setfile]=useState();
  const[text,setText]=useState();
  const[texto,settexto]=useState();

  let handleChange=(event)=>{
    setText(event.target.value)
  }

  let UploadBtn=async(event)=>{
    setfile(event.target.files[0]);
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const fileSizeInBytes = parseInt(selectedFile.size);

        localStorage.setItem('size',fileSizeInBytes);
      }
  };

  let fetchfunction=async(result)=>{
    let start_time=Date.now();
    let method = document.getElementsByClassName('select1')[0].value;
    let operation = document.getElementsByClassName('select2')[0].value;
    if (result) {
      let size=localStorage.getItem('size');
      let radiobtns=document.getElementsByName('gender');
      let radiovalue;
      radiobtns.forEach(element => {
        if (element.checked) {
          radiovalue=element.value;
        }
      });

      if (radiovalue!=null) {
        let response;
        switch (radiovalue) {
          case "0":
            response=await fetch("/redis",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                text:result,
                operation:operation
              }),
            })
            break;

          case "1":
            response=await fetch("/noredis",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                text:result,
                operation:operation
              }),
            })
            break;

          default:
            break;
        }
        response = await response.json();
        let end_time=Date.now();

        let response_Time=end_time-start_time;
        if (radiovalue=="0") {
          localStorage.setItem('respnose',response_Time)
        } else {
          response_Time+=parseInt(localStorage.getItem('respnose'))
        }

        if (radiovalue=="0") {
          document.getElementsByClassName("samurai")[0].children[0].setAttribute('src',Dionh);
        }else{
          document.getElementsByClassName("samurai")[0].children[0].setAttribute('src',Dion);
        }
        
        settexto(`Status : ${response.status} Ping : ${response_Time}`)
      }
      else{
        alert("Please Select a Radio Button")
      }

  
    }
  }

  let direct=()=>{
    window.location.href="http://localhost:3000/battle";
  }

  let Test=async()=>{
    let result;
    if (text) {
      result=text;
      fetchfunction(result);
    }
    else{
      const filread= new FileReader();
      filread.readAsText(file);
      filread.onload=(async()=>{
        result=filread.result;
        fetchfunction(result);
      })
    }
    }
  return (
    <div>
      <div className="db_images">
        <img className='doc_img' src={Docker} alt="docker" />
        <img className='red_img' src={Redis} alt="redis" />
        <img className="mongo_img" src={Mongo} alt="mongo" />
        <img className='node_img' src={Node} alt="node" />
      </div>

      <input type="text" className="input_txt" value={text} onChange={handleChange} /> 
      
      <div className='container'>

      <select className="select1">
        <option value="post">POST</option>
        <option value="get">GET</option>
      </select>

      <select className="select2">
        <option value="create">Create</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
      </select>

      <button className="test_btn" type="button" onClick={Test}>Test</button>
      </div>

      
      <div className='uploadBtn'>
        <input type="file"  id="upload_btn" onChange={UploadBtn}/>
        <label htmlFor="upload_btn" id="level_btn">
          <img src={Upload} alt="Upload JSON" />
          Upload JSON
        </label>
        </div>

      

      <div className="radio_btn">
    <label>
        <input id="db1" type="radio" name="gender" value="0" /> With Redis
    </label>
    
    <label>
        <input id="db2" type="radio" name="gender" value="1" /> Without Redis
    </label>
  </div>

    <div className="samurai">
      <img className="dino_img" src={neutral} alt="dino" />
      {texto}
    </div>



    <div className='bt_btn'>
      <img className="swords_img" src={Swords} alt="swords"  onClick={direct}/>
      <button className="battle" type="button" onClick={direct}>
        <h5>Head on to the Battle Page</h5>
    </button>
    </div>

  </div>

  )
}
