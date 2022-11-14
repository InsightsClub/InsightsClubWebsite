import React from "react";
import Article from "./Article/Article";
import "./Articles.css";

const article = {
	id: "1",
	title: "Test Article",
	content:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor   ",
	author: "shrey srivastav",
	createdAt: "21/11/11",
};

function Articles() {
	return (
		<>
			<div className='articles-main-container'>
				<div className='articles-header'>Articles</div>
				<div className='articles-container'>
					<Article article={article}/>
				</div>
			</div>
		</>
	);
}

export default Articles;
