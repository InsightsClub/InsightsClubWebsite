import React from "react";
import "./ArticleLanding.css";
import Articles from "../../components/Articles/Articles";
import Newsarticle from "./Newsletters/Newsarticle";
import Magazines from "./magazines/Magazines";
import Header from './Header';

import {BrowserRouter as Router, Routes , Route,Outlet} from 'react-router-dom'
import Article from "../../components/Articles/Article/Article";

function ArticleLanding() {
	return (
    <div className="my">
      <div className="child1">
       
      <Header/>
      <br/>
      <br/>
      
      <Outlet/>
      
      
        
          
        
      
        
      </div>
      

      <div className="child2">
      <Newsarticle />
      </div>
    </div>
  );
}

export default ArticleLanding;
