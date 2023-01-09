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
        <br/>
        <div className='containeer2'>
            <b><h3 className='b'>{props.head}</h3></b>
            <br/>
            <h5 className='b'>{props.body}</h5>

        </div>
      
    </div>
  )
}

export default Magazine;
