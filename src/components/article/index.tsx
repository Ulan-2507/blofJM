import React, { useState } from "react";
import "./article.scss";
import format from "date-fns/format";
import cn from "classnames";
import ReactMarkdown from "react-markdown";
import defaultAvatar from "../../img/defaultPhoto.jpg";
import { IArticle } from "../../types/article";
import { NavLink, useHistory } from "react-router-dom";
import { RouteURLS } from "../../helpers/route-urls";
import Favorited from "./favorite";
import Modal from "../modal-window";
import { deleteArticle } from "../../api/article";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { useActions } from "../../hooks/useActions";

type PropsType = {
  data: IArticle;
  isFull: boolean;
};

const Article: React.FC<PropsType> = ({ data, isFull }) => {
  const article = useAppSelector((state) => state.articles.article)!;
  const articleData = isFull ? article : data;
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
  } = articleData;

  const { setEdit } = useActions();
  const currentAuthor = useAppSelector((state) => state.user.user?.username);
  const [showModal, setShowModal] = useState(false);
  const showHandler = () => {
    setShowModal((showModal) => !showModal);
  };
  const history = useHistory();
  const deleteHandler = () => {
    deleteArticle(slug);
    setShowModal((showModal) => !showModal);
    history.push(RouteURLS.ARTICLES);
  };
  const isOwnArticle = currentAuthor === author.username;

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
      <div className="article__row">
        <p>{description}</p>
        {isFull && isOwnArticle && (
          <div className="article__control-btns">
            <button
              className="article__btn article__btn--delete"
              onClick={showHandler}
              type="button"
            >
              Delete
            </button>
            <NavLink
              className="article__btn article__btn--edit"
              onClick={() => setEdit(true)}
              to={`${RouteURLS.ARTICLES}/${slug}/edit`}
            >
              Edit
            </NavLink>

            <Modal
              showModal={showModal}
              showHandler={showHandler}
              deleteHandler={deleteHandler}
            />
          </div>
        )}
      </div>

      {isFull && <ReactMarkdown>{body}</ReactMarkdown>}
    </div>
  );
};

export default Article;
