import React from "react";
import Article from "./Article/Article";
import "./Articles.css";

const article = {
	id: "1",
	title: "Test Article",
	content:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ",
	author: "jon wic",
	createdAt: "1/1/1",
};

function Articles() {
	return (
		<>
			<div className='articles-main-container'>
				<div className='articles-header'>Articles</div>
				<div className='articles-container'>
					<Article article={article} />
					<Article article={article} />
					<Article article={article} />
					<Article article={article} />
					<Article article={article} />
				</div>
			</div>
		</>
	);
}

export default Articles;
