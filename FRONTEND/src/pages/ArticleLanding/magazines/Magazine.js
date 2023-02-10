import React from 'react';
import './Magazine.css';

const Magazine = (props) => {
  const me=()=>{
    window.open(`${props.link}`, "_blank");
  }
  return (
    <div className='ct-1'>
        <div className='cnt1' style={{backgroundImage:`url(${props.img})`}} target="_blank" onClick={me}>
            
        </div>
    </div>
  )
}

export default Magazine;
