import { InfoOutlined } from '@mui/icons-material';
import { PlayArrow } from '@mui/icons-material';
import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import './featured.scss'

const Featured = ({type, setGenre}) => {
  const[content, setContent]=useState({});

  useEffect(()=>{
    const getRandomContent = async ()=>{
      try{
        const res = await axios.get("https://leoflix.onrender.com/api/movies/random?type="+{type},{
        headers: {
          token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjYxNTQ3NWMwZDBlNDNjZjlkZmMwOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2OTIzMTYyMywiZXhwIjoyNTMzMjMxNjIzfQ.PBibyNQnxuwtGS85pnVBa1nBdenZbt5og0UB3zqyz5k",
        },
      });
        setContent(res.data[0]);
      }catch(err){
        console.log(err);
      }
    };
    getRandomContent();
  }, []);
  return (
    <div className='featured '>
        {type && (
          <div className='category'>
            <span>{type === "movies"? "Movies":"Series"}</span>
            <select name='genre' id='genre' onChange={e=>setGenre(e.target.value)}>
              <option>Genre</option>
              <option value='adventure'>Adventure</option>
              <option value='comedy'>Comedy</option>
              <option value='crime'>Crime</option>
              <option value='fantasy'>Fantasy</option>
              <option value='historical'>Historical</option>
              <option value='horror'>Horror</option>
              <option value='romance'>Romance</option>
              <option value='sci-fi'>Sci-Fi</option>
              <option value='thriller'>Thriller</option>
              <option value='western'>Western</option>
              <option value='animation'>Animation</option>
              <option value='drama'>Drama</option>
              <option value='documentary'>Documentary</option>
            </select>
          </div>
        )}
        <img src={content.img} 
          alt=''
        />
        <div className="info">
          <img
            src={content.imgTitle}
            alt=''          
          />
          <span className='desc'>
            {content.desc}
          </span>
          <div className="buttons">
            <button className='play'>
                <PlayArrow/>
                <span>play</span>
            </button>
            <button className='more'>
                <InfoOutlined/>
                <span>info</span>
            </button>
          </div>
        </div>
    </div>
  )
}

export default Featured;
