import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useHistory, NavLink } from "react-router-dom";
import { deleteArticle } from "../../api/article";
import { RouteURLS } from "../constants/route-urls";
import { useActions } from "../../hooks/useActions";
import { useAppSelector } from "../../hooks/useAppSelelctor";
import { IArticle } from "../../types/article";
import Modal from "../modal-window";

import Article from "./article";

type PropsType = {
  article: IArticle;
};

const FullArticle: React.FC<PropsType> = ({ article }) => {
  const currentAuthor = useAppSelector((state) => state.user.user?.username);
  const { setEdit } = useActions();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const showHandler = () => {
    setShowModal((showModal) => !showModal);
  };

  const deleteHandler = () => {
    deleteArticle(article.slug);
    setShowModal((showModal) => !showModal);
    history.push(RouteURLS.ARTICLES);
  };

  const isOwnArticle = currentAuthor === article?.author.username;

  return (
    <Article data={article} isFull={true}>
      <div className="article__row">
        <p>{article.description}</p>
        {isOwnArticle && (
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
              to={`${RouteURLS.ARTICLES}/${article.slug}/edit`}
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
      <ReactMarkdown>{article.body}</ReactMarkdown>
    </Article>
  );
};
export default FullArticle;
