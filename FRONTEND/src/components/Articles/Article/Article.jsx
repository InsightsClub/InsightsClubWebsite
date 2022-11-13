import React from "react";
import "./Article.css";
import test from "../../../media/test.png";
import { useNavigate } from "react-router-dom";

function Article({ article }) {
	const navigator = useNavigate();

	return (
		<div className='article-container' onClick={() => navigator(`/article/id`)}>
			<div className='article-image'>
				<img src={test} alt='articleImage' className="ig" />
			</div>
			
			<div className='article-content'>
				<div className='article-header'>
					<p className='article-header-title'>
						<strong>{article.title}</strong>
					<div className='article-footer'>
					<p className='article-footer-author'>~ {article.author}</p>
					<p className='article-footer-createdAt'>{article.createdAt}</p>
				</div>
					</p>
				</div>
				<div className='article-main'>{article.content}</div>
			</div>
		</div>
	);
}

export default Article;
