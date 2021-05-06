import React from "react";
import "./article.scss";
import format from "date-fns/format";
import cn from "classnames";
import ReactMarkdown from "react-markdown";

import { IArticle } from "../../types/article";
import { NavLink } from "react-router-dom";
import { RouteURLS } from "../../helpers/route-urls";
import Favorited from "./favorite";
type PropsType = {
  data: IArticle;
  isFull: boolean;
};

const Article: React.FC<PropsType> = ({ data, isFull }) => {
  const {
    body,
    title,
    favorited,
    favoritesCount,
    tagList,
    author,
    updatedAt,
    description,
    slug,
  } = data;

  return (
    <div className={cn("article", { "article--isFull": isFull })}>
      <div className="article__header">
        <div>
          <h5 className="article__title">
            <NavLink to={`${RouteURLS.ARTICLES}/${slug}`}>{title}</NavLink>
          </h5>
          <Favorited favorited={favorited} favoritesCount={favoritesCount} />
          <ul className="article__tags">
            {tagList.map((tag: string | undefined, i: number) => (
              <li key={i}>{tag}</li>
            ))}
          </ul>
        </div>
        <div className="article__author">
          <div className="article__author-data">
            <div className="article__author-name">{author.username}</div>
            <div className="article__date">
              {format(new Date(updatedAt), "MMMM d, yyyy")}
            </div>
          </div>
          <div className="article__avatar">
            <img src={author.image} alt="avatar" />
          </div>
        </div>
      </div>
      <p className="article__text">{description}</p>
      {isFull && <ReactMarkdown>{body}</ReactMarkdown>}
    </div>
  );
};

export default Article;
