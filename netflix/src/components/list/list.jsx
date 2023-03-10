import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { display } from '@mui/system';
import { useState } from 'react';
import { useRef } from 'react';
import ListItem from '../listItem/listItem';
import './list.scss';

const List = ({list})=>{
  const [slideNumber, setSlideNumber]= useState(0);
  const [isMoved, setIsMoved]= useState(false);
  const [clickLimit, setClickLimit]= useState(window.innerWidth/230);
  const listRef=useRef()
  const handleClick=(direction)=>{
      setIsMoved(true);
      let distance = listRef.current.getBoundingClientRect().x - 50
      if(direction==="left" && slideNumber>0){
          setSlideNumber(slideNumber-1);
          distance=distance+230;
          listRef.current.style.transform = "translateX(" + distance + "px)";
          
      }
      if(direction==="right" && slideNumber<10-clickLimit){
        setSlideNumber(slideNumber+1);
        distance=distance-230;
        listRef.current.style.transform = "translateX(" + distance + "px)"
    }
  }
  return (
    <div className='list'>
        <span className="listTitle">{list.title}</span>
        <div className='wrapper'>
            <ArrowBackIosOutlined className='sliderArrow left' 
              onClick={()=>handleClick("left")}
              style={{display: !isMoved && "none"}} 
            />
            <div className='container' ref={listRef}>
                {list.content.map((item, i)=>(
                  <ListItem index={i} item={item}/>
                ))}
            </div>
            <ArrowForwardIosOutlined className='sliderArrow right' onClick={()=>handleClick("right")}/>
        </div>
    </div>
  )
}

export default List;