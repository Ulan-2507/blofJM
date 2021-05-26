import React from "react";

import { useAppSelector } from "../hooks/useAppSelelctor";
import { v4 as uuidv4 } from "uuid";

import Article from "../components/article";
import PaginationBar from "../components/pagination";

const ArticlesPage: React.FC = () => {
  const { articles, isLoading } = useAppSelector((state) => state.articles);

  return (
    <React.Fragment>
      <ul>
        {!isLoading &&
          articles.map((article) => (
            <Article key={uuidv4()} data={article} isFull={false} />
          ))}
      </ul>
      <PaginationBar />
    </React.Fragment>
  );
};

export default ArticlesPage;
