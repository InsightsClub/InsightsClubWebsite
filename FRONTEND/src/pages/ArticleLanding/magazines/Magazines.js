import React from 'react';
import Magazine from './Magazine';
import a from './Insights Club Newsletter-1.pdf';
import i from './ins.jpg';
import './magazines.css';
import { Outlet } from 'react-router-dom';

const Magazines = () => {
  return (
    <div className='containerr'>
      <Magazine className='a'link={a} img={i}  head="Lorem ipsum dolor, "
      body="consectetur  elit, sed Ut enm, quis modo consequat.  in voluptate velit ui officia d"/>
      
      <Magazine className='a' link={a} img={i}  head="Lorem ipsum dolor, "
      body="consectetur  elit, sed Ut enm, quis modo consequat.  in voluptate velit ui officia d"/>
      <Magazine className='a' link={a} img={i}  head="Lorem ipsum dolor, "
      body="consectetur  elit, sed Ut enm, quis modo consequat.  in voluptate velit ui officia d"/>
       <Magazine className='a' link={a} img={i}  head="Lorem ipsum dolor, "
      body="consectetur  elit, sed Ut enm, quis modo consequat.  in voluptate velit ui officia d"/>
       <Magazine className='a' link={a} img={i}  head="Lorem ipsum dolor, "
      body="consectetur  elit, sed Ut enm, quis modo consequat.  in voluptate velit ui officia d"/>

      
      
    </div>
  )
}

export default Magazines;
