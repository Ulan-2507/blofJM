import React from "react";
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";
import { RouteURLS } from "../constants/route-urls";
import { IArticle } from "../../types/article";
import Modal from "../modal-window";

import Article from "./article";

type PropsType = {
  article: IArticle;
  isOwnArticle: boolean;
  setEdit: (value: boolean) => void;
  showHandler: () => void;
  deleteHandler: () => void;
  showModal: boolean;
};

const FullArticle: React.FC<PropsType> = ({
  article,
  isOwnArticle,
  setEdit,
  showHandler,
  deleteHandler,
  showModal,
}) => {
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
