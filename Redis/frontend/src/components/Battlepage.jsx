import React,{useState} from 'react'
import '../css/battle.css'
import Back from '../img/prev.png'
import Upload from '../img/upload.png'
import Redis from '../img/redis.png'
import Leaf from '../img/leaf.png'
import Cassandra from '../img/cassandra.png'
import Battle from '../img/battle.png'
import { Link } from 'react-router-dom'


export default function Battlepage() {
  const[file,setfile]=useState();

  let aimbutton=(event)=>{
    setfile(event.target.files[0]);
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const fileSizeInBytes = parseInt(selectedFile.size);

        localStorage.setItem('size',fileSizeInBytes);
      }
  }


  let launch=()=>{
    let start_time=Date.now();
    let result;
    const filread= new FileReader();
    filread.readAsText(file);
    filread.onload=(async()=>{
      result=filread.result;
      let response1=await fetch("/redisbattle",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          text:result
        }),
      });

      let response2=await fetch("/cassandrabattle",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          text:result
        }),
      });

      response1 = await response1.json();
      let redis_result=[];
      for (let index = 0; index < response1.endtime.length; index++) {
        redis_result.push(response1.endtime[index]-response1.starttime[index])      
      }
      
      response2 = await response2.json();
      

      let cass_result=[];
      for (let index = 0; index < response2.endtime.length; index++) {
        cass_result.push(redis_result[index]+response2.endtime[index])      
      }
      alert([...redis_result])
      alert([...cass_result])
    })
  }

  return (
    <div>
    <Link to="/"><img className="back_btn" src={Back} alt="back" /></Link>

    <h1 className="heading">BATTLEGROUND</h1>

    
    <div className='uploadBtnn'>
      <input type="file" id="uploadBtn" onChange={aimbutton}/>
      <label htmlFor="uploadBtn" id="levelBtn">
        <img src={Upload} alt="Upload JSON" />
        Upload JSON
      </label>
      </div>

      <div className="radis_box">
      <img className="radis_img" src={Redis} alt="radis" />
      <img className="leaf_img" src={Leaf} alt="leaf" />
    </div>

    <div className="cassandra_box">
      <img className="cassandra_img" src={Cassandra} alt="cassandra" />
    </div>

    <img className="battel_img" src={Battle} alt="battle" onClick={launch}/>
  </div>
  )
}
