import React, { useEffect } from "react";
import { useParams } from "react-router";
import Article from "../components/article";
import { getArticle } from "../api";
import { useAppSelector } from "../hooks/useAppSelelctor";

const ArticlePage: React.FC = () => {
  const { slug }: any = useParams();
  const article = useAppSelector((state) => state.articles.article);
  const isLoading = useAppSelector((state) => state.articles.isLoading);
  useEffect(() => {
    getArticle(slug);
  }, [slug]);

  return (
    <React.Fragment>
      {!isLoading && article && <Article data={article} isFull={true} />}
    </React.Fragment>
  );
};
export default ArticlePage;
