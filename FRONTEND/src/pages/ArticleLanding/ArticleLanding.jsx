import React from "react";
import "./ArticleLanding.css";
import Articles from "../../components/Articles/Articles";
import Newsarticle from "./Newsletters/Newsarticle";

function ArticleLanding() {
	return (
    <div className="my">
      <div className="child1">
        <Articles />
      </div>

      <div className="child2">
      <Newsarticle />
      </div>
    </div>
  );
}

export default ArticleLanding;
