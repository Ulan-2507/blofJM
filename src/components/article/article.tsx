import React from "react";
import "./article.scss";
import format from "date-fns/format";
import cn from "classnames";

import defaultAvatar from "./defaultPhoto.jpg";
import { IArticle } from "../../types/article";
import { NavLink } from "react-router-dom";
import { RouteURLS } from "../constants/route-urls";
import Favorited from "../favorite";

type PropsType = {
  data: IArticle;
  isFull: boolean;
};

const Article: React.FC<PropsType> = ({ data, isFull, children }) => {
  const {
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
        <div className="article__info">
          <h5 className="article__title">
            <NavLink to={`${RouteURLS.ARTICLES}/${slug}`}>{title}</NavLink>
          </h5>
          <Favorited
            slug={slug}
            favorited={favorited}
            favoritesCount={favoritesCount}
          />
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
            <img src={author.image || defaultAvatar} alt="avatar" />
          </div>
        </div>
      </div>
      {!isFull && (
        <div className="article__row">
          <p>{description}</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default Article;
