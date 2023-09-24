import React from 'react'
import '../css/test.css'
import Docker from "../img/docker.png"
import Redis from "../img/redis.png"
import Mongo from "../img/pngegg.png"
import Node from "../img/nodejs.png"
import Upload from "../img/upload.png"
import Dion from "../img/dino.png"
import Swords from "../img/swords.png"

export default function testpage() {
  return (
    <div>
      <div className="db_images">
        <img className='doc_img' src={Docker} alt="docker" />
        <img className='red_img' src={Redis} alt="redis" />
        <img className="mongo_img" src={Mongo} alt="mongo" />
        <img className='node_img' src={Node} alt="node" />
      </div>

      <input type="text" className="input" />

      <select className="select1">
        <option value="post">POST</option>
        <option value="get">GET</option>
      </select>

      <select className="select2">
        <option value="create">Create</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
      </select>

      <button className="test_btn" type="button">Test</button>

      <form>
        <input type="file" accept=".json" id="upload_btn" />
        <label htmlFor="upload_btn" id="level_btn">
          <img src={Upload} alt="Upload JSON" />
          Upload JSON
        </label>

        <div className="radioBtn">
          <input type="radio" id="db1" name="redis" value="with_redis" />
          With Redis
          <input type="radio" id="db2" name="redis" value="without_redis" />
          Without Redis
        </div>
      </form>

      <img className="dino_img" src={Dion} alt="dino" />

      <img className="swords_img" src={Swords} alt="swords" />

      

    <button className="battle" type="button"><h5>Head on to the Battle Page</h5>
    </button>

    </div>


    
  )
}
