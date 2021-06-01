import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { deleteArticle, getArticle } from "../api/article";
import { useAppSelector } from "../hooks/useAppSelelctor";
import FullArticle from "../components/article/fullArticle";
import { useHistory } from "react-router-dom";
import { RouteURLS } from "../components/constants/route-urls";
import { useActions } from "../hooks/useActions";

const FullArticlePage: React.FC = () => {
  const { slug }: any = useParams();
  const { article, isLoading } = useAppSelector((state) => state.articles);
  const currentAuthor = useAppSelector((state) => state.user.user?.username);
  const { setEdit } = useActions();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const showHandler = () => {
    setShowModal((showModal) => !showModal);
  };

  const deleteHandler = () => {
    deleteArticle(slug);
    setShowModal((showModal) => !showModal);
    history.push(RouteURLS.ARTICLES);
  };

  const isOwnArticle = currentAuthor === article?.author.username;
  useEffect(() => {
    getArticle(slug);
  }, [slug]);

  return (
    <React.Fragment>
      {!isLoading && article && (
        <FullArticle
          article={article}
          isOwnArticle={isOwnArticle}
          setEdit={setEdit}
          showHandler={showHandler}
          deleteHandler={deleteHandler}
          showModal={showModal}
        />
      )}
    </React.Fragment>
  );
};
export default FullArticlePage;
