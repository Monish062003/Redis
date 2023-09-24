import React from 'react'
import '../css/battle.css'
import Back from '../img/prev.png'
import Upload from '../img/upload.png'
import Redis from '../img/redis.png'
import Leaf from '../img/leaf.png'
import Cassandra from '../img/cassandra.png'
import Battle from '../img/battle.png'

export default function battlepage() {
  return (
    <div>
    <img className="back_btn" src={Back} alt="back" />

    <h1 className="heading">BATTLEGROUND</h1>

    <form>
      <input type="file" accept=".json" id="uploadBtn" />
      <label htmlFor="uploadBtn" id="levelBtn">
        <img src={Upload} alt="Upload JSON" />
        Upload JSON
      </label>
    </form>

    <div className="radis_box">
      <img className="radis_img" src={Redis} alt="radis" />
      <img className="leaf_img" src={Leaf} alt="leaf" />
    </div>

    <div className="cassandra_box">
      <img className="cassandra_img" src={Cassandra} alt="cassandra" />
    </div>

    <img className="battel_img" src={Battle} alt="battle" />
  </div>
  )
}
