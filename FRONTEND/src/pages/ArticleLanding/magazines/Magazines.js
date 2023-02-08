import React from 'react';
import Magazine from './Magazine';
import a from './Insights Club Newsletter-1.pdf';
import i from './ins.jpg';
import './magazines.css';
import { Outlet } from 'react-router-dom';

const Magazines = () => {
  return (
    <div className='containerr'>
      <div className='cont2'>
        <Magazine className='a'link={a} img={i}  />
        <Magazine className='a' link={a} img={i}  />
        <Magazine className='a' link={a} img={i}  />
        <Magazine className='a' link={a} img={i}  />
        <Magazine className='a' link={a} img={i}  />
      </div>

      
      
    </div>
  )
}

export default Magazines;
