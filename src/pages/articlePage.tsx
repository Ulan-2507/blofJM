import React, { useEffect } from "react";
import { useParams } from "react-router";
import Article from "../components/article";
import { getArticle } from "../api/article";
import { useAppSelector } from "../hooks/useAppSelelctor";

const ArticlePage: React.FC = () => {
  const { slug }: any = useParams();
  const { article, isLoading } = useAppSelector((state) => state.articles);

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
