import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getArticle } from "../api/article";
import { useAppSelector } from "../hooks/useAppSelelctor";
import FullArticle from "../components/article/fullArticle";

const ArticlePage: React.FC = () => {
  const { slug }: any = useParams();
  const { article, isLoading } = useAppSelector((state) => state.articles);

  useEffect(() => {
    getArticle(slug);
  }, [slug]);

  return (
    <React.Fragment>
      {!isLoading && article && <FullArticle article={article} />}
    </React.Fragment>
  );
};
export default ArticlePage;
