import React from 'react'
import { AcUnit } from '@material-ui/icons';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import Navbar from '../../components/navbar/navbar';
import './home.scss';
import Featured from '../../components/featured/featured';
import List from '../../components/list/list';
import { useState } from 'react';
import { useEffect } from 'react';
import { LineAxisOutlined } from '@mui/icons-material';
import axios from "axios"

const Home = ({type}) => {
  const [lists, setLists]=useState([]);
  const [genre, setGenre]=useState(null);
  useEffect(()=>{
    const getRandomLists = async ()=>{
      try{
        const res=await axios.get(
          '/lists'+(type? "?type=" + type: "")+(genre ? "&genre"+genre:""),{
            headers:{
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjYxNTQ3NWMwZDBlNDNjZjlkZmMwOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2OTIzMTYyMywiZXhwIjoyNTMzMjMxNjIzfQ.PBibyNQnxuwtGS85pnVBa1nBdenZbt5og0UB3zqyz5k"
            }
          }
        );
        console.log(res);
        setLists(res.data);
      }
      catch(err){
        console.log(err)
      };
    };
    getRandomLists();
  },[type, genre]);
  return (
    <div className='home'>
        <Navbar/>
        <Featured type={type} setGenre={setGenre}/>
        {lists.map((list)=>(
          <List list={list}/>
        ))}
    </div>
  )
}

export default Home;
