import React from 'react';
import Base1 from './Base1';
import pdf from './Insights Club Newsletter.pdf'
import a from './Insights Club Newsletter-1.pdf';
import b from './IC NEWSLETTER SEPTEMBER ISSUE.pdf';
import c from './IC Newsletter Oct-Nov Issue.pdf';
import sc from './sc.png';
import d from './IC Newsletter JAN.pdf';
import v from './vsr.png';
import v0 from './ve.png';
import me from './me.jpg';
import i from './i.jpg';
import e from './e.jpg';
import ins from './a.jpg';
import dec from './IC Newsletter DEC-2.pdf';
import './Newsarticle.css'
import s from './s.png';
import decem from './dec.png';
const Newsarticle=()=>{
    return(
        <div className='container2'>
            <div className='txtt'>Newsletters</div>
            <br/>
            <div className='divv'>
                <Base1 className='az' img={ins} link={a}/>           
                <Base1 className='az' img={s} link={b}/>    
                <Base1 className='az' img={sc} link={c}/>  
                <Base1 className='az' img={decem} link={dec}/> 
                <Base1 className='az' img={v} link={d}/>    
                
            </div>
            
        </div>
    )
}
export default Newsarticle;